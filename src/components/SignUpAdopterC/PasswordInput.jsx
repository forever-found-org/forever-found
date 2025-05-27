import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function PasswordInput({ name, value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-56 p-4">
      <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full border border-black rounded-md p-2 pr-10" />

      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-6 flex items-center">

        {
            showPassword ? ( <EyeSlashIcon className="h-5 w-5 text-gray-600" /> )
                      : ( <EyeIcon className="h-5 w-5 text-gray-600" />) 
        }
   
      </button>
    </div>
  );
}
export default PasswordInput