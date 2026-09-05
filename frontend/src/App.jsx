import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Components/Pages/Signup"
import Login from "./Components/Pages/Login"
import Landing from "./Components/Landing/Landing"
import Studenthome from "./Components/Home/Studenthome"
import Adminhome from "./Components/Home/Adminhome"
import Teacherhome from "./Components/Home/Teacherhome"

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/studenthome' element={<Studenthome />} />
        <Route path='/adminhome' element={<Adminhome />} />
        <Route path='/teacherhome' element={<Teacherhome />} />
    </Routes>
</BrowserRouter>
  )
}

export default App