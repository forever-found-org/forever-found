import AH_Navbar from "../components/Adopter_Home_c/AH_Navbar";
import NGOcard from "../components/Adopter_Home_c/NGOcard";
const ngoData = [
    {
      image: 'https://images.pexels.com/photos/7978484/pexels-photo-7978484.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Helping Hands Foundation',
      location: 'Delhi, India'
    },
    {
      image: 'https://images.pexels.com/photos/8524960/pexels-photo-8524960.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Care for All',
      location: 'Mumbai, India'
    },
    {
      image: 'https://images.pexels.com/photos/7977936/pexels-photo-7977936.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Bright Futures Trust',
      location: 'Bangalore, India'
    },
    {
      image: 'https://images.pexels.com/photos/7978854/pexels-photo-7978854.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Hope Foundation',
      location: 'Chennai, India'
    },
    {
      image: 'https://media.istockphoto.com/id/1481721816/photo/cheerful-mom-and-kid-girl-clapping-hands-giving-high-five.jpg?b=1&s=612x612&w=0&k=20&c=l5kf0ofO0dKY54gHPr7rTgMOxTK3v0AoIzUg4Ae7Ht8=',
      name: 'Child First',
      location: 'Hyderabad, India'
    },
    {
      image: 'https://images.pexels.com/photos/8205377/pexels-photo-8205377.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Smile NGO',
      location: 'Kolkata, India'
    }
  ];
function Adopter_Home(){
    return(
        <>
        <AH_Navbar/>
        <div className="h-auto w-auto p-2 m-3 text-center">
            <h1 className="text-2xl font-bold capitalize font-serif">choose your nearest ngo! </h1>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-4" style={{backgroundColor:'#E3F2FD'}}>
            {
                ngoData.map((ngo,index)=>(
                    <NGOcard
                     key={index}
                     image={ngo.image}
                     name={ngo.name}
                     location={ngo.location}
                    />
                ))
            }
        </div>

        </>
        
    );
}
export default Adopter_Home;