import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header className="flex items-center justify-between mb-10 font-medium text-sm md:text-md">
            <Link 
            to="/"
            className="hover:scale-105 transition-all duration-300">
                <h1 className="text-2xl font-[Concert] text-main">
                    <span className="md:hidden text-3xl">EE</span>       {/* Nur sichtbar unter md */}
                    <span className="hidden md:inline">Education Explorer</span> {/* Sichtbar ab md */}
                </h1>
            </Link>

            <div className="flex items-center justify-center gap-5">
                <Link 
                to="/showSchool"
                className=" cursor-pointer hover:scale-105 transition-all duration-300 hover:text-main"> 
                <p className=" cursor-pointer hover:scale-105 transition-all duration-300 hover:text-main">Find Schools</p>
                </Link>
                <p className=" cursor-pointer hover:scale-105 transition-all duration-300 hover:text-main">Blog</p>
                <p className=" cursor-pointer hover:scale-105 transition-all duration-300 hover:text-main">Log Out</p>
                <img 
                src="/img/Search Icon.svg" alt="icon of a search glas"
                className="h-6 hover:scale-110 transition-all duration-300 cursor-pointer" />
                
            </div>
        </header>
      
        
     );
}
 
export default Header;