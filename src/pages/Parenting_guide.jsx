import AH_Navbar from "../components/Adopter_Home_c/AH_Navbar";
import Info from "../components/Parenting_guide_c/info";
//import GuideCard from "../components/Parenting_guide_c/guide_card";
const guide_card_dets=[
    {
        title:'Creating Strong Bonds with Your Child'
    },
    {
        title:'How to Talk About Adoption with Love & Honesty'
    },
    {
        title:'Making Your Home a Safe, Loving Space'
    },
    {
        title:'Caring for Your Child’s Health & Growth'
    },
    {
        title:'Learn, Grow, and Parent with Confidence'
    },
    {
        title:' You’re Not Alone – Finding Your Village'
    },
    {
        title:'The Legal Side of Adoption (What to Know)'
    }
];
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