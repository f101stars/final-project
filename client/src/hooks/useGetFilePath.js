const useGetFilePath = () =>{

    const getFilePath = (img) =>{
        if(img){
            return "http://localhost:5000/uploads/" + img
        }else{
            return "/noavatar.png"
        }
    }

    return {getFilePath}

}
export default useGetFilePath