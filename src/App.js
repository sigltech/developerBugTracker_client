import { Route, Routes } from 'react-router-dom';
import { LoginPortal, Dashboard } from './Views/Pages';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DashboardComp, ViewBugs, BugFormPage, NewUser, SettingsPage } from './Views/Components';


function App() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

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
            <Route path="/registerNewUser" element={<NewUser />} />
            <Route path="/usersettings" element={<SettingsPage user={user} />} />
          </Route>
        )}
        <Route path="*" element={
          <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <h1 className='text-9xl'>404</h1>
            <button className='button' onClick={() => navigate('/dashboard')}>Go back to dashboard</button>
          </div>
        } />
      </Routes>

    </>
  );
}

export default App;
