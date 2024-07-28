import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SiteLayuot from './components/layout/site/SiteLayuot';
import DashLayout from './components/layout/dash/DashLayout';
import UsersList from './features/users/list/UsersList';
import AddUser from './features/users/add/AddUser';
import SingleUser from './features/users/view/SingleUser';
import LoginPage from './features/auth/login/LoginPage';
import TurnsListAdmin from './features/turns/admin/list/TurnsListAdmin';
import AddTurn from './features/turns/admin/add/AddTurn';
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from './features/auth/PersistLogin';
import SingleTurn from './features/turns/admin/view/SingleTurn';
import AddTurnUser from './features/turns/user/add/AddTurnUser';
import TurnsListUser from './features/turns/user/list/TurnsListUser';
import Page404 from './features/page404';
import TypesList from './features/types/list/TypesList';
import AddType from './features/types/add/AddType';
import SingleType from './features/types/view/SingleType';
import Profile from './features/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SiteLayuot />}>
            <Route index element={<h1>Site</h1>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Page404 />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowRoles={["Admin", "User"]} />}>
                <Route path='/dash' element={<DashLayout />}>
                  <Route index element={<h1>Dashboard</h1>} />
                  <Route element={<RequireAuth allowRoles={["Admin"]} />}>
                    <Route path='users' element={<Outlet />}>
                      <Route index element={<UsersList />} />
                      <Route path='add' element={<AddUser />} />
                      <Route path=':id' element={<SingleUser />} />
                    </Route>
                    <Route path='types' element={<Outlet />}>
                      <Route index element={<TypesList />} />
                      <Route path='add' element={<AddType />} />
                      <Route path=':id' element={<SingleType />} />
                    </Route>
                    <Route path='turns-admin' element={<Outlet />}>
                      <Route index element={<TurnsListAdmin />} />
                      <Route path='add' element={<AddTurn />} />
                      <Route path=':id' element={<SingleTurn />} />
                    </Route>
                  </Route>
                  <Route path='turns-user' element={<Outlet />}>
                    <Route index element={<TurnsListUser />} />
                    <Route path="add" element={<AddTurnUser />} />
                  </Route>
                  <Route path='my-profile' element={<Outlet/>}>
                    <Route path=':id' element={<Profile/>}/>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;