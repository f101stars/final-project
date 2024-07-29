const Turn = require('../models/Turn');
const Type = require('../models/Type')
const addTime = (start, time) => {
    const end = { hour: start.hour, minutes: start.minutes }
    end.minutes += time
    end.hour += (end.minutes / 60)
    end.minutes %= 60
    end.hour -= (end.hour % 1)
    return end
}
const checkTime = (newTurnDate, newTurnStart, newTurnEnd, existingTurns) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newTurnDateObject = new Date(newTurnDate);
    if (newTurnDateObject < today) {
        console.log("1");
        return false;
    }
    const newTurnStartTime = newTurnStart.hour * 100 + newTurnStart.minutes;
    const newTurnEndTime = newTurnEnd.hour * 100 + newTurnEnd.minutes;
    // console.log("start", newTurnStartTime);
    // console.log("end", newTurnEndTime);
    if (newTurnEndTime <= newTurnStartTime) {
        console.log("2");
        return false;

    }

    if (newTurnStartTime < 900 || newTurnEndTime > 1700) {
        if (newTurnEndTime > 1700) {
            console.log("3");
            return false;

        }
    }
    for (const turn of existingTurns) {
        const turnStartTime = turn.start.hour * 100 + turn.start.minutes;
        const turnEndTime = turn.end.hour * 100 + turn.end.minutes;
        // console.log("old", (turn.turnDate).toString(), "new", newTurnDate.toString());

        if (((turn.turnDate).toString() == newTurnDate.toString()) &&
            ((turnStartTime >= newTurnStartTime && turnStartTime < newTurnEndTime) ||
                (turnEndTime > newTurnStartTime && turnEndTime <= newTurnEndTime))
        ) {
            console.log("4");
            return false;
        }
    }

    return true;
};

const getAllTurns = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const turns = await Turn.find({
            deleted: false,
            turnDate: { $gte: today }
        })
            .populate("description")
            .populate("user")
            .sort({ turnDate: 1, "start.hour": 1, "start.minutes": 1 })
            .lean();

        if (!turns.length) {
            return res.status(404).json({
                error: true,
                message: "No turns found",
                data: null
            });
        }

        res.status(200).json({
            error: false,
            message: "",
            data: turns
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal server error",
            data: null
        });
    }
};

const getTurnById = async (req, res) => {
    const { id } = req.params
    const turn = await Turn.findOne({ _id: id }).populate("description").populate("user").lean()
    if (!turn)
        res.status(404).json("dont find")
    res.json(turn)
}
const creatTurn = async (req, res) => {
    const { turnDate, user, start, description, notes } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const turns = await Turn.find({ deleted: false, turnDate: { $gte: today }}).lean();
    const type = await Type.findById(description).lean()
    const end = addTime(start, type.time)
    // Check if appointment day is allowed
    const appointmentDate = new Date(turnDate);
    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 2 || dayOfWeek === 6) { // 2 for Tuesday, 6 for Saturday
        return res.status(400).json({
            error: true,
            message: "Appointments are not allowed on Tuesday and Saturday",
            data: null
        });
    }


    if (!checkTime(appointmentDate, start, end, turns)) {
        return res.status(400).json({
            error: true,
            message: "Turn time is not valid",
            data: null
        });
    }

    try {
        const turn = await Turn.create({ turnDate, user, start, end, description, notes });
        res.status(201).json({
            error: false,
            message: "Appointment created successfully",
            data: turn
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: { error },
            data: null
        });
    }
};

const updateTurn = async (req, res) => {
    const { id, turnDate, user, start, end, description, notes, type } = req.body;

    // Validate inputs
    if (!id || !user || !start || !end || !description || !turnDate) {
        return res.status(400).json({
            error: true,
            message: "id, user, start time, end time, description, and date are required!",
            data: null
        });
    }

    const turn = await Turn.findById(id).exec();
    if (!turn) {
        return res.status(404).json({
            error: true,
            message: "Turn not found",
            data: null
        });
    }

    const turns = await Turn.find().lean();

    // Check if appointment day is allowed
    const appointmentDate = new Date(turnDate);
    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 2 || dayOfWeek === 6) { // 2 for Tuesday, 6 for Saturday
        return res.status(400).json({
            error: true,
            message: "Appointments are not allowed on Tuesday and Saturday",
            data: null
        });
    }
    if (!checkTime(appointmentDate, start, end, turns)) {
        return res.status(400).json({
            error: true,
            message: "Turn time is not valid",
            data: null
        });
    }


    // Update turn
    turn.turnDate = turnDate;
    turn.start = start;
    turn.end = end;
    turn.user = user;
    turn.description = description;
    turn.notes = notes;
    try {
        await turn.save();
        res.status(200).json({
            error: false,
            message: "Turn updated successfully",
            data: turn
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Failed to update turn",
            data: null
        });
    }
};

const deleteTurn = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "ID is required",
            data: null
        });
    }

    try {
        const turn = await Turn.findById(_id).exec();
        if (!turn) {
            return res.status(404).json({
                error: true,
                message: "Turn not found",
                data: null
            });
        }

        turn.deleted = true
        await turn.save()
        res.status(200).json({
            error: false,
            message: "Turn deleted successfully",
            data: null
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Failed to delete turn",
            data: null
        });
    }
};

module.exports = { getAllTurns, getTurnById, creatTurn, updateTurn, deleteTurn }