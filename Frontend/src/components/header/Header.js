import { Link } from "react-router-dom";
import logo from "../images/blog.png";

const Header = () => {
    return (
        <div>
            <nav className="flex justify-between bg-green-700 py-4 px-4">
                <div className="flex justify-between">
                    <Link to='/'>
                        <img src={logo} className="w-10 h-10 rounded-full mr-2" alt="Logo"/>
                    </Link>     
                    <div className="bg-white rounded-lg">
                        <input type="text" placeholder="Search" className="bg-gray-300 p-2 rounded-lg"/>
                    </div>
                </div>
                <div className="flex justify-around w-80">
                   <button className= "bg-yellow-300 hover:bg-yellow-500 rounded-full py-2 px-4 font-bold text-black"> <Link to="/" >Home</Link></button>
                   <button className= "bg-yellow-300 hover:bg-yellow-500 rounded-full py-2 px-4 font-bold text-black"><Link to="/signin">SignIn</Link></button>
                   <button className= "bg-yellow-300 hover:bg-yellow-500 rounded-full py-2 px-4 font-bold text-black hidden md:block"><Link to="/signup">SignUp</Link></button>
                </div>
            </nav>
        </div>
    );
}

export default Header;
