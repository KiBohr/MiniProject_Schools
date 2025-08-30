import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header className="flex items-center justify-between">
            <Link 
            to="/"
            className="hover:scale-110 transition-all duration-300">
                <h1 className="text-2xl font-[Concert] text-main">Education Explorer</h1>
            </Link>

            <div>
                <Link 
                to="/showSchool"
                className="hover:scale-110 transition-all duration-300">
                    <p>Explore</p>
                </Link>
            </div>
            
        </header>
      
        
     );
}
 
export default Header;