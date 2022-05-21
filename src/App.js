import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './components/context/AuthProvider';
import Login from './components/LoginRelated/Login/Login';
import PrivateRouter from './components/LoginRelated/PrivateRouter/PrivateRouter';
import Register from './components/LoginRelated/Register/Register';
import ChatRoom from './Pages/CTO/ChatRoom/ChatRoom';
import Employees from './Pages/CTO/Employees/Employees';
import MakeManager from './Pages/CTO/MakeManager/MakeManager';
import PostTask from './Pages/CTO/PostTask/PostTask';
import Projects from './Pages/CTO/Projects/Projects';
import RequestsComplaints from './Pages/CTO/RequestsComplaints/RequestsComplaints';
import DashboardFront from './Pages/Dashboard/DashboardFront/DashboardFront';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import AllPostedTasks from './Pages/Managers/AllPostedTasks/AllPostedTasks';
import AssignTeam from './Pages/Managers/AssignTeam/AssignTeam';
import MyRunningTasks from './Pages/Managers/MyRunningTasks/MyRunningTasks';
import TaskDetails from './Pages/Managers/TaskDetails/TaskDetails';
import MyReport from './Pages/Workers/MyReport/MyReport';
import MyWorks from './Pages/Workers/MyWorks/MyWorks';
import Requests from './Pages/Workers/Requests/Requests';



function App() {
  return (
    <div className="Ap">


      <AuthProvider>

        <BrowserRouter>
          {/* <Header></Header> */}


          <Routes>

            {/* <Route path='/' element={<Home></Home>} />
            <Route path='/home' element={<Home></Home>} /> */}

            <Route path='/' element={<Login></Login>} />
            <Route path='/home' element={<login></login>} />



            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<Register></Register>} />




            {/* nested routes */}
            <Route path='/dashboard' element={<PrivateRouter> <DashboardHome></DashboardHome> </PrivateRouter>}>
              <Route path='front' element={<PrivateRouter> <DashboardFront></DashboardFront> </PrivateRouter>} />

              {/* CTO pages links */}
              <Route path='make_manager' element={<PrivateRouter> <MakeManager></MakeManager> </PrivateRouter>} />
              <Route path='post_task' element={<PrivateRouter> <PostTask></PostTask> </PrivateRouter>} />
              <Route path='employees' element={<PrivateRouter> <Employees></Employees> </PrivateRouter>} />
              <Route path='chat' element={<PrivateRouter> <ChatRoom></ChatRoom> </PrivateRouter>} />
              <Route path='projects' element={<PrivateRouter> <Projects></Projects> </PrivateRouter>} />
              <Route path='requestsComplaints' element={<PrivateRouter> <RequestsComplaints></RequestsComplaints> </PrivateRouter>} />

              {/* Managers pages links */}
              <Route path='allPostedTasks' element={<PrivateRouter> <AllPostedTasks></AllPostedTasks>  </PrivateRouter>} />
              <Route path='myRunningTasks' element={<PrivateRouter> <MyRunningTasks></MyRunningTasks> </PrivateRouter>} />
              <Route path='taskDetails/:id' element={<PrivateRouter> <TaskDetails></TaskDetails> </PrivateRouter>} />
              <Route path='assignTeam/:id' element={<PrivateRouter> <AssignTeam></AssignTeam> </PrivateRouter>}></Route>


              {/* workers page Link */}
              <Route path='myWorks' element={<PrivateRouter> <MyWorks></MyWorks> </PrivateRouter>} />
              <Route path='myReport' element={<PrivateRouter> <MyReport></MyReport> </PrivateRouter>} />
              <Route path='request' element={<PrivateRouter> <Requests></Requests> </PrivateRouter>} />



            </Route>




          </Routes>
        </BrowserRouter>
      </AuthProvider>



    </div >
  );
}

export default App;
