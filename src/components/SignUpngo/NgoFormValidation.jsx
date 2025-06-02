function NgoFormValidation(NGOData){
    const errors={};
    const regexPattern={
        name: /^[A-Za-z\s]+$/,
        email: /^\S+@\S+\.\S+$/,
        altcontact: /^[6-9]\d{9}$/,
        contact: /^[6-9]\d{9}$/,
        website:/^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/,
        name_contact:/^[A-Za-z\s]+$/,
        desg_contact:/^[A-Za-z\s]+$/,
        regnum:/^[A-Z0-9\/\-]{4,30}$/,
        caranum:/^[A-Z]{2}\/(SAA|AFAA)\/\d{4}\/\d{6,7}$/,
        pass: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }

    for(let key in NGOData){
        if(key==="website"||key==="galimg1"||key==="galimg2"||key==="galimg3"||key==="testimonial1"||key==="testimonial2"||key==="testimonial3"){
            continue;
        }
        const value = NGOData[key];
        if (value === null || (typeof value === "string" && value.trim() === ""))
            errors[key] = "*Required field.";
    }

    if (Object.keys(errors).length > 0) {
        alert("Form Incomplete");
    }
    if (!regexPattern.name.test(NGOData.name)) 
    errors.name = "*Use only alphabets and spaces.";

     if (!regexPattern.email.test(NGOData.email)) 
    errors.email = "*Invalid Email address.";
  
    if (!regexPattern.contact.test(NGOData.contact)) 
        errors.contact = "*Invalid Contact number.";

     if (!regexPattern.altcontact.test(NGOData.altcontact)) 
        errors.altcontact = "*Invalid Alt. contact number.";

    const children = Number(NGOData.num_child);
    if (isNaN(children) || children <=0 || !Number.isInteger(children)) 
        errors.num_child = "*Use poitive integer.";


    const yr = Number(NGOData.year);
    if (isNaN(yr) || yr < 1990 || !Number.isInteger(yr)) 
        errors.year = "*Year should be greater than 1990";


    if (!regexPattern.name_contact.test(NGOData.name_contact)) 
    errors.name_contact = "*Use only alphabets and spaces.";

    if (!regexPattern.desg_contact.test(NGOData.desg_contact)) 
    errors.desg_contact = "*Use only alphabets and spaces.";

    if (!regexPattern.website.test(NGOData.website)) 
    errors.website = "*Invalid url";

     if (!regexPattern.regnum.test(NGOData.regnum)) 
    errors.regnum = "*Invalid registration number";

      if (!regexPattern.caranum.test(NGOData.caranum)) 
    errors.caranum = "*Invalid cara number";

    if (!regexPattern.pass.test(NGOData.pass)) 
    errors.pass = "*Invalid Password";


    return errors;

    }
    
    


export default NgoFormValidation;