
import Info from "../components/Parenting_guide_c/info";
import MainLayout from "../components/Common_Components/MainLayout";

function Parenting_guide(){
    return (
        <MainLayout>
        
        <h1 className="m-2 mt-6 text-4xl font-bold font-serif text-center">Parenting Guide for Adoptive Parents </h1>
        <p className="text-lg  font-serif text-gray-400 text-center">A compassionate guide to support you through your journey as a new adoptive parent.</p>
        <Info/>
        
       </MainLayout>
    );
}
export default Parenting_guide;