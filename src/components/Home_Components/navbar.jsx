import logo from "../../images/logo.png"
function Navbar({onLoginClick}){
    return (
        <nav className="flex items-center p-2 justify-between shadow-md" style={{backgroundColor:'rgb(242, 224, 201)'}}>
            <div className="flex items-center gap-4">
                <img
                src={logo}
                alt="logo"
                className="w-15 h-20 rounded-full"
                />
            </div>
            <div className="ml-10">
                <h1 className="text-4xl font-bold" style={{color:'#411E1E'}}>FOREVER FOUND</h1>
                <p className="text-2xl "><i>Every Child Deserves a Home</i></p>
            </div>
            <div className="space-x-8 mr-4">
                
                <button className="text-blue-500 hover:underline">Home</button>
                <button className="text-blue-500 hover:underline" onClick={onLoginClick}>Login</button>
                <button className="text-blue-500 hover:underline">Signup</button>
                <button className="text-blue-500 hover:underline">About</button>
                <button className="text-blue-500 hover:underline">Help</button>
            </div>
        </nav>
    );
}
export default Navbar;