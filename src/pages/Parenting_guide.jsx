import AH_Navbar from "../components/Adopter_Home_c/AH_Navbar";
import Info from "../components/Parenting_guide_c/info";


function Parenting_guide(){
    return (
        <>
        <AH_Navbar/>
        <h1 className="m-2 mt-6 text-4xl font-bold font-serif text-center">Parenting Guide for Adoptive Parents </h1>
        <p className="text-lg  font-serif text-gray-400 text-center">A compassionate guide to support you through your journey as a new adoptive parent.</p>
        <Info/>
        
        </>
    );
}
export default Parenting_guide;