import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import ProjectPage from "./pages/ProjectPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import PostLoginRedirect from "./pages/PostLoginRedirect";
import NoTeamPage from "./pages/NoTeamPage";
import CreateTask from "./pages/CreateTask";
import CreateProject from "./pages/CreateProject";
import SingleProjectPage from "./pages/SingleProjectPage";
import CreateSprint from "./pages/CreateSprintPage";
import SingleSprintPage from "./pages/SingleSprintPage";
import CreateTeam from "./pages/CreateTeam";
import SingleTaskPage from "./pages/SingleTaskPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/login"} element={<Login />} />

      <Route path={"/signup"} element={<Signup />} />

      <Route path='/post-login' element={<ProtectedRoute>
        <PostLoginRedirect />
      </ProtectedRoute>} />

      <Route path='/no-team' element={<NoTeamPage />} />

      <Route path="/dashboard/teams/:teamId/" element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} >
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<HomePage />} />
      <Route path="task" element={<TaskPage />} />
      <Route path="project" element={<ProjectPage />} />
      <Route path="team-member" element={<TeamMemberPage />} />
      <Route path="tasks/:taskId" element={<SingleTaskPage />} />
      <Route path="projects/:projectId/sprints/new" element={<CreateSprint />} />
      <Route path="sprints/:sprintId/tasks/new" element={<CreateTask />} />
      <Route path="projects/new" element={<CreateProject />} />
      <Route path="projects/:projectId" element={<SingleProjectPage />} />
       <Route path="projects/:projectId/sprints/:sprintId" element={<SingleSprintPage />} />
      </Route>
      <Route path="/dashboard/teams/new" element={<CreateTeam />} />
    </Routes>
    

    </BrowserRouter>
  )
}

export default App
