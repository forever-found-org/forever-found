function NGOcard({ image, name, location }){
    return(
       <div className="h-auto w-[25%] mx-6 my-2 mb-4 rounded-lg bg-white/80 border border-gray-300 flex flex-col items-center shadow-md" >
        <div className="h-auto w-auto p-3 m-2 mt-4 mx-4 border bg-white/90 border-gray-300 flex justify-center rounded-md">
            <img className="w-full h-48 object-cover rounded-md" src={image} alt={name}  />
        </div>
        <div className="h-12 w-full mt-2 m-1 py-3 uppercase text-center" style={{backgroundColor:'#D0F0C0'}}><p className="text-xl font-bold font-serif">{name}</p></div>
        <div className="text-center p-2 m-3" style={{backgroundColor:'#E0F7FA'}}>
            <p className="font-serif">LOCATION: {location}</p>
        </div>
       </div>
    );
}
export default NGOcard;