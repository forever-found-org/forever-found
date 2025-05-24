function FormValidator(adopterData)
{
  const errors = {};

  const regexPattern = {
    name: /^[A-Za-z\s]+$/,
    religion: /^[A-Za-z\s]+$/,
    email: /^\S+@\S+\.\S+$/,
    contact: /^[6-9]\d{9}$/,
    occupation: /^[A-Za-z\s]+$/,
    aadhar: /^\d{12}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  for (let key in adopterData)
  {
    const value = adopterData[key];
    if (value === null || (typeof value === "string" && value.trim() === ""))
            errors[key] = "*Required field.";
  }

  if (Object.keys(errors).length > 0) {
  alert("Form Incomplete");
}

  if (!regexPattern.name.test(adopterData.name)) 
    errors.name = "*Use only alphabets and spaces.";
  

  if (!regexPattern.religion.test(adopterData.religion)) 
    errors.religion = "*Use only alphabets and spaces.";
  

  if (!regexPattern.email.test(adopterData.email)) 
    errors.email = "*Invalid Email address.";
  

  if (!regexPattern.contact.test(adopterData.contact)) 
    errors.contact = "*Invalid Contact number.";

  const children = Number(adopterData.bioChildren);
  if (isNaN(children) || children < 0 || !Number.isInteger(children)) 
    errors.bioChildren = "*Use poitive integer.";
  

  if (!regexPattern.occupation.test(adopterData.occupation)) 
    errors.occupation = "*use only alphabets and spaces.";
  

  const salary = Number(adopterData.salary);
  if (isNaN(salary) || salary <= 0) 
    errors.salary = "*Salary must be positive.";
  

  if (!regexPattern.aadhar.test(adopterData.aadhar)) 
    errors.aadhar = "*must be exactly 12 digits.";
  
  if (!regexPattern.password.test(adopterData.pass)) 
    errors.pass = "*Invalid Password";

  return errors;

}

export default FormValidator;
