import { Link } from "react-router-dom";
function NGOcard({ image, name, location }) {
    return (
        <Link to={`/adopter-home/${encodeURIComponent(name)}`}>
        <div className="m-4 rounded-lg bg-white/80 border border-gray-300 shadow-md flex flex-col items-center hover: cursor-pointer">
                <div className="p-3 mt-4 mx-4 border bg-white/90 border-gray-300 flex justify-center rounded-md">
                    <img className="w-40 h-40 object-cover rounded-md" src={image} alt={name} />
                </div>
                <div className="w-full mt-2 py-3 uppercase text-center" style={{ backgroundColor: '#D0F0C0' }}>
                    <p className="text-xl font-bold font-serif">{name}</p>
                </div>
                <div className="text-center p-2 m-3" style={{ backgroundColor: '#E0F7FA' }}>
                    <p className="font-serif">LOCATION: {location}</p>
                </div>
            </div>
        </Link>
            
            
    );
}
export default NGOcard;
