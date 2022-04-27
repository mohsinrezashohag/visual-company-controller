import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './components/context/AuthProvider';
import Header from './components/Header/Header';
import Login from './components/LoginRelated/Login/Login';
import PrivateRouter from './components/LoginRelated/PrivateRouter/PrivateRouter';
import Register from './components/LoginRelated/Register/Register';
import ChatRoom from './Pages/Ceo/ChatRoom/ChatRoom';
import Employees from './Pages/Ceo/Employees/Employees';
import MakeManager from './Pages/Ceo/MakeManager/MakeManager';
import PostTask from './Pages/Ceo/PostTask/PostTask';
import Projects from './Pages/Ceo/Projects/Projects';
import RequestsComplaints from './Pages/Ceo/RequestsComplaints/RequestsComplaints';
import Home from './Pages/Common/Home/Home';
import OurServices from './Pages/Common/OurServices/OurServices';

import Policy from './Pages/Common/Policy/Policy';
import DashboardFront from './Pages/Dashboard/DashboardFront/DashboardFront';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import AllPostedTasks from './Pages/Managers/AllPostedTasks/AllPostedTasks';
import MyRunningTasks from './Pages/Managers/MyRunningTasks/MyRunningTasks';



function App() {
  return (
    <div className="Ap">


      <AuthProvider>

        <BrowserRouter>
          <Header></Header>


          <Routes>
            <Route path='/' element={<Home></Home>} />
            <Route path='/home' element={<Home></Home>} />
            <Route path="/policy" element={<Policy></Policy>} />


            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<Register></Register>} />



            <Route path='/ourServices' element={<OurServices></OurServices>} />

            {/* nested routes */}
            <Route path='/dashboard' element={<PrivateRouter> <DashboardHome></DashboardHome> </PrivateRouter>}>
              <Route path='front' element={<PrivateRouter> <DashboardFront></DashboardFront> </PrivateRouter>} />

              {/* COO pages links */}
              <Route path='make_manager' element={<PrivateRouter> <MakeManager></MakeManager> </PrivateRouter>} />
              <Route path='post_task' element={<PrivateRouter> <PostTask></PostTask> </PrivateRouter>} />
              <Route path='employees' element={<PrivateRouter> <Employees></Employees> </PrivateRouter>} />
              <Route path='chat' element={<PrivateRouter> <ChatRoom></ChatRoom> </PrivateRouter>} />
              <Route path='projects' element={<PrivateRouter> <Projects></Projects> </PrivateRouter>} />
              <Route path='requestsComplaints' element={<PrivateRouter> <RequestsComplaints></RequestsComplaints> </PrivateRouter>} />

              {/* Managers pages links */}
              <Route path='allPostedTasks' element={<PrivateRouter> <AllPostedTasks></AllPostedTasks>  </PrivateRouter>} />
              <Route path='myRunningTasks' element={<PrivateRouter> <MyRunningTasks></MyRunningTasks> </PrivateRouter>} />



            </Route>










          </Routes>
        </BrowserRouter>
      </AuthProvider>



    </div >
  );
}

export default App;
