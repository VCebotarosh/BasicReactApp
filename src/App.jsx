import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPage, { jobLoader } from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";


function App() {
  // Add new Job
  async function addJob(newJob) {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // Delete Job
  async function deleteJob(id) {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };
  
  async function updateJob(job) {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
      });
      return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/jobs" element={<JobsPage/>}/>
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}/>
      <Route path="/job/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Route>
    )
  );
  
  return <RouterProvider router={router}/>
}

export default App;