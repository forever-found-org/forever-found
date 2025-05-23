function Login({onClose}){
    return(
       <>
       <div className=" absolute top-28 right-10 p-4  border-2 border-black rounded-lg bg-white bg-opacity-30 text-center">
        <form>
            <input className="text-xl m-3 rounded-lg p-2 border-2 border-black" placeholder="username"></input>
            <br></br>
            <input className="text-xl m-3 rounded-lg p-2 border-2 border-black" placeholder="password"></input>
            <br></br>
            <button className="border-2 m-3 p-2 rounded-lg bg-black text-white" onClick={onClose}>submit</button>
            <br></br>
            <button className="border-2 m-3 p-2 rounded-lg bg-black text-white" onClick={onClose}>sign in with google</button>
            <br />
            <button className="border-2 m-3 p-2 rounded-lg bg-black text-white" onClick={onClose}>custom signup</button>
        </form>
       </div>
       </>
    );
}
export default Login;