async function Validator(formData) {
  const errors = {};
  const regexPattern = {
    name: /^[A-Za-z\s]+$/,
    age: /^(1[0-8]|[2-9])$/,
    gender: /^(Male|Female|Other)$/,
    healthStatus: /^[A-Za-z0-9\s]{2,100}$/,
    educationLevel: /^[A-Za-z0-9\s]{2,50}$/,
    religion: /^[A-Za-z\s]+$/,
  };

  
  for (let key in formData) {
    const value = formData[key];
    if(key==="adopterId")
        continue;
    if (key === "gallery") {
        if (!formData.gallery[0]) errors.cwc = "*CWC image required.";
        if (!formData.gallery[1]) errors.police = "*Police Verification image required.";
  }
    if (value === null ||(typeof value === "string" && value.trim() === "") ||(Array.isArray(value) && value.length === 0)) {
      errors[key] = "*Required field.";
    }
  }

  // 2️⃣ Only run further validations if empty check passed
  if (Object.keys(errors).length === 0) {
    if (!regexPattern.name.test(formData.name)) errors.name = "*Use only alphabets and spaces.";
    if (!regexPattern.age.test(formData.age)) errors.age = "*Should be between 2 and 18";
    if (!regexPattern.gender.test(formData.gender)) errors.gender = "*Select gender.";
    //dob
    if (formData.dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(formData.dateOfBirth);

  if (isNaN(birthDate.getTime())) {
    errors.dateOfBirth = "*Invalid date format.";
  } else {
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) calculatedAge--;

    // Check range
    if (calculatedAge < 2 || calculatedAge > 18) {
      errors.dateOfBirth = "*Age should be between 2 and 18 years.";
    }

    // Cross-check entered age vs calculated age
    if (formData.age && parseInt(formData.age, 10) !== calculatedAge) {
      errors.age = `*Entered age (${formData.age}) does not match DOB age (${calculatedAge}).`;
    }
  }
}


    if (!regexPattern.healthStatus.test(formData.healthStatus)) errors.healthStatus = "*Use only alphabets and numbers.";
    if (!regexPattern.educationLevel.test(formData.educationLevel)) errors.educationLevel = "*Use only alphabets and numbers.";
    if (!regexPattern.religion.test(formData.religion)) errors.religion = "*Use only alphabets and spaces.";

    // Backend NGO ID validation
    try {
      const res = await fetch("http://localhost:5000/api/ngos/validate-ngo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ngoId: formData.ngoId }),
      });
      const data = await res.json();
      if (res.status !== 200) errors.ngoId = data.error || "*Invalid NGO ID.";
    } catch (err) {
      errors.ngoId = "*Server error while validating NGO ID.";
    }
  }
  console.log("Validation errors:", errors);
  return errors;
}
export default Validator;