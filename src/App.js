import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './components/context/AuthProvider';
import Login from './components/LoginRelated/Login/Login';
import PrivateRouter from './components/LoginRelated/PrivateRouter/PrivateRouter';
import Register from './components/LoginRelated/Register/Register';
import BlogDetails from './Pages/Common/BlogDetails.js/BlogDetails';
import Blogs from './Pages/Common/Blogs/Blogs';
import NoticeOrBlogs from './Pages/Common/NoticeOrBlogs/NoticeOrBlogs';
import ChatRoom from './Pages/CTO/ChatRoom/ChatRoom';
import Employees from './Pages/CTO/Employees/Employees';
import MyPostedTasks from './Pages/CTO/MyPostedTasks/MyPostedTasks';
import PostTask from './Pages/CTO/PostTask/PostTask';
import Projects from './Pages/CTO/Projects/Projects';
import RequestsComplaints from './Pages/CTO/RequestsComplaints/RequestsComplaints';
import DashboardFront from './Pages/Dashboard/DashboardFront/DashboardFront';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import AcceptedProjects from './Pages/Managers/AcceptedProjects/AcceptedProjects';
import AllPostedTasks from './Pages/Managers/AllPostedTasks/AllPostedTasks';
import AssignTeam from './Pages/Managers/AssignTeam/AssignTeam';
import MySubmitedProjects from './Pages/Managers/MySubmitedProjects/MySubmitedProjects';
import ProjectsUnderMe from './Pages/Managers/ProjectsUnderMe/ProjectsUnderMe';
import ReviewAction from './Pages/Managers/ReviewAction/ReviewAction';
import TaskDetails from './Pages/Managers/TaskDetails/TaskDetails';
import MyReport from './Pages/Workers/MyReport/MyReport';
import MySubmissions from './Pages/Workers/MySubmissions/MySubmissions';
import MyworkDetails from './Pages/Workers/MyworkDetails/MyworkDetails';
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
              <Route path='post_task' element={<PrivateRouter> <PostTask></PostTask> </PrivateRouter>} />
              <Route path='myPostedTasks' element={<PrivateRouter> <MyPostedTasks></MyPostedTasks> </PrivateRouter>} />
              <Route path='employees' element={<PrivateRouter> <Employees></Employees> </PrivateRouter>} />
              <Route path='chat' element={<PrivateRouter> <ChatRoom></ChatRoom> </PrivateRouter>} />
              <Route path='projects' element={<PrivateRouter> <Projects></Projects> </PrivateRouter>} />
              <Route path='requestsComplaints' element={<PrivateRouter> <RequestsComplaints></RequestsComplaints> </PrivateRouter>} />

              {/* Managers pages links */}
              <Route path='allPostedTasks' element={<PrivateRouter> <AllPostedTasks></AllPostedTasks>  </PrivateRouter>} />
              <Route path='myAcceptedProjects' element={<PrivateRouter> <AcceptedProjects></AcceptedProjects></PrivateRouter>} />
              <Route path='taskDetails/:id' element={<PrivateRouter> <TaskDetails></TaskDetails> </PrivateRouter>} />
              <Route path='assignTeam/:id' element={<PrivateRouter> <AssignTeam></AssignTeam> </PrivateRouter>}></Route>
              <Route path='projectUnderMe' element={<PrivateRouter> <ProjectsUnderMe></ProjectsUnderMe> </PrivateRouter>} />
              <Route path='mySubmittedProjects' element={<PrivateRouter> <MySubmitedProjects></MySubmitedProjects> </PrivateRouter>} />
              <Route path='reviewAction/:projectTitle' element={<PrivateRouter> <ReviewAction></ReviewAction></PrivateRouter>} />

              <Route path='blogsOrNotice' element={<PrivateRouter> <NoticeOrBlogs></NoticeOrBlogs> </PrivateRouter>} />
              <Route path='blogs' element={<PrivateRouter> <Blogs></Blogs> </PrivateRouter>} />
              <Route path='bolgDetails/:id' element={<PrivateRouter> <BlogDetails></BlogDetails> </PrivateRouter>} />



              {/* workers page Link */}
              <Route path='myWorks' element={<PrivateRouter> <MyWorks></MyWorks> </PrivateRouter>} />
              <Route path='workDetails/:id' element={<PrivateRouter> <MyworkDetails></MyworkDetails> </PrivateRouter>} />
              <Route path='mySubmissions' element={<PrivateRouter> <MySubmissions></MySubmissions> </PrivateRouter>} />
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
