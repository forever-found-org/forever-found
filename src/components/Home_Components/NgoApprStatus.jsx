import { useState } from "react";
function NgoApprStatus(){
    const[appr,setAppr]=useState(false);
    //later handle this function n use state by checking if appr actually approved pending or rejected
    const handleappr=()=>{
        setAppr(!appr);
    }

    const [ngoname,setName]=useState("");
    const [ngoemail,setEmail]=useState("");
    const [errors,setErrors]=useState({name: "",email:""});
    
    const regexPattern={
        name:/^[A-Za-z\s]+$/,
        email:/^\S+@\S+\.\S+$/
    }

    const validateNgoappr=()=>{
        let val=true;
        let temp_errors={name: "",email:""};
        if(!ngoname.trim()){
            temp_errors.name="*Required field";
            val=false;
        }
        else if(!regexPattern.name.test(ngoname)){
              temp_errors.name="*Invalid name";
              val=false;
        }
        if(!ngoemail.trim()){
            temp_errors.email="*Required field";
            val=false;
        }
        else if(!regexPattern.email.test(ngoemail)){
            temp_errors.email="*Invalid email";
            val=false;
        }
        setErrors(temp_errors);
        return val;
    }
    
    const handleNgoappr=()=>{
        if(validateNgoappr()){
            handleappr();//check from admin
        }
    }
    return (
        <div className="h-auto w-auto shadow-md p-4 rounded-xl border border-gray-400 bg-[#F9F4F1] backdrop-blur-md absolute top-32 right-[240px]">
            <div className="flex flex-col">
                <div className="m-2 flex flex-col ">
                    <div className="flex ">
                        <label htmlFor="" className="mr-2 mt-1 text-lg font-bold font-serif text-[#4B2E2E]">NGO Name :</label>
                        <input value={ngoname} onChange={(e)=>{setName(e.target.value)}} className="p-2 rounded-lg border border-rose-200 font-serif w-64" type="text" placeholder="NGO name"/>
                    </div>
                    {errors.name && <p className="text-red-600 mt-0 text-sm">{errors.name}</p>}
                </div>
                <div className="m-2 flex flex-col">
                    <div className="flex">
                        <label htmlFor="" className="mr-2 mt-1 text-lg font-bold font-serif  text-[#4B2E2E]">NGO Email :</label>
                    <input value={ngoemail} onChange={(e)=>{setEmail(e.target.value)}} className="p-2 rounded-lg border border-rose-200 font-serif w-64" type="text" placeholder="Ngo Email" />
                    </div>
                    {errors.email && <p className="text-red-600  mt-0 text-sm">{errors.email}</p>}
                </div>
                
            </div>
            <div className="mt-3 text-center flex flex-col items-center">
                <button className="p-2 rounded-md text-center font-semibold font-serif bg-[#5a8f7b] text-white hover:bg-[#497564]" onClick={handleNgoappr}>Check Status</button>
                
                {appr&&<label className="mt-1 font-serif font-semibold" htmlFor="">Approved!</label> /*later insert appropriate text after checking*/}

            </div>
        </div>
    );
}
export default NgoApprStatus;