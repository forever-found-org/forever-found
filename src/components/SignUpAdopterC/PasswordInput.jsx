import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function PasswordInput({ name, value, onChange, placeholder, className }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-56 p-4">
      <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />

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