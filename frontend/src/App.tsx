import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import AddSchool from "./page/addSchool/AddSchool"
import ShowSchool from "./page/showSchools/ShowSchools"
import Layout from "./Layout"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element ={<AddSchool/>}/>
        <Route path="showSchool" element ={<ShowSchool/>}/>
      </Route>
    )
  )
  

  return (
   <main className="font-[Quicksand] p-5 bg-bg text-base">
    <RouterProvider router = {router}/>
   </main>
  )
}

export default App
