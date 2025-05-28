import { useState } from "react";
function NgoApprStatus(){
    const[appr,setAppr]=useState(false);
    //later handle this function n use state by checking if appr actually approved pending or rejected
    const handleappr=()=>{
        setAppr(!appr);
    }
    return (
        <div className="h-auto w-auto shadow-md p-4 rounded-xl border border-gray-400 bg-[#F9F4F1] backdrop-blur-md absolute top-32 right-[240px]">
            <div className="flex flex-col">
                <div className="m-2 flex justify-between">
                    <label htmlFor="" className="mr-2 mt-1 text-lg font-bold font-serif text-[#4B2E2E]">NGO Name :</label>
                    <input className="p-2 rounded-lg border border-rose-200 font-serif w-64" type="text" placeholder="NGO name"/>
                </div>
                <div className="m-2 flex justify-between">
                    <label htmlFor="" className="mr-2 mt-1 text-lg font-bold font-serif  text-[#4B2E2E]">NGO Email :</label>
                    <input className="p-2 rounded-lg border border-rose-200 font-serif w-64" type="text" placeholder="Ngo Email" />
                </div>
            </div>
            <div className="mt-3 text-center flex flex-col items-center">
                <button className="p-2 rounded-md text-center font-semibold font-serif bg-[#5a8f7b] text-white hover:bg-[#497564]" onClick={handleappr}>Check Status</button>
                
                {appr&&<label className="mt-1 font-serif font-semibold" htmlFor="">Approved!</label> /*later insert appropriate text after checking*/}

            </div>
        </div>
    );
}
export default NgoApprStatus;