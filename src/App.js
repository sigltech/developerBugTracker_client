import { Route, Routes } from 'react-router-dom';
import { LoginPortal, Dashboard } from './Views/Pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardComp, ViewBugs, BugFormPage } from './Views/Components';
import { authLoggedIn } from './Controllers/redux/authSlice';
import jwt_decode from "jwt-decode";


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const userToken = window.localStorage.getItem('BT_token');


  return (
    <>
      <Routes>
        {!user.loggedIn ? (
          <Route path="/" element={<LoginPortal />} />
        ) : (
          <Route path='/' element={<Dashboard />} >
            <Route path="/" element={<DashboardComp />} />
            <Route path="/viewbugs" element={<ViewBugs />} />
            <Route path="/create" element={<BugFormPage />} />
          </Route>
        )}
        {/* <Route path="*" element={
          <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <h1 className='text-9xl'>404</h1>
            <button className='button' onClick={() => navigate('/dashboard')}>Go back to dashboard</button>
          </div>
        } /> */}
      </Routes>

    </>
  );
}

export default App;
