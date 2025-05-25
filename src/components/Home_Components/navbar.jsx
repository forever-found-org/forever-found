import logo from "../../images/logo.png"
function Navbar({onLoginClick}){
    return(
        <nav className="flex items-center p-2 relative h-[120px]" style={{backgroundColor:'rgb(242, 224, 201)'}}>
            <div className="flex items-center mx-4">
                <img
                    src={logo}
                    alt="logo"
                    className="w-15 h-20 rounded-full"
                />
            </div>
            <div className="flex flex-col mr-20 ml-16">    
                <h1 className="text-8xl font-[quicksand] font-[700]" style={{color:'#411E1E'}}>FOREVER FOUND</h1>
                <p className="text-2xl font-serif -mt-2 ml-2"><i>Every Child Deserves a Home</i></p>      
            </div>
            <div className="space-x-8 mr-4 absolute bottom-0 right-4">
                <button className="text-blue-600 font-bold font-serif text-base  hover:text-[#411E1E] hover:underline">Check NGO Approval</button>   
                <button className="text-blue-600 font-bold font-serif text-base  hover:text-[#411E1E] hover:underline" onClick={onLoginClick}>Login</button>
                <button className="text-blue-600 font-bold font-serif text-base  hover:text-[#411E1E] hover:underline">About</button>
                <button className="text-blue-600 font-bold font-serif text-base  hover:text-[#411E1E] hover:underline">Help</button>
            </div>
        </nav>
    );
}
export default Navbar;