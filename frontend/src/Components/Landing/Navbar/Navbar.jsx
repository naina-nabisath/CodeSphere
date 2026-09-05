import "./Navbar.css"
import { Search } from "lucide-react"
import Logo from "../../../assets/Logo.jpeg"
import { useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <div className="logo">
                <img src={Logo} alt="logo" />
                <h1>CodeSphere</h1>
            </div>
            <div>
                <ul className="nav-items">
                    <li>Courses</li>
                    <li>Career Path</li>
                    <li>Instructors</li>
                    <li>Exams</li>
                    <li>Pricings</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="side-nav-items">
                <input type="text" placeholder="Search..." />
                <Search />
            </div>
            <div className="side-nav-buttons">
                <button onClick={()=> {navigate('login')}} className="Login">Login</button>
                <button onClick={()=> {navigate('/signup')}} className="Signup">SignUp</button>
            </div>
        </div>
    )
}

export default Navbar