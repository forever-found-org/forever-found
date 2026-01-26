function FormValidator(adopterData) {
  const errors = {};

  const regexPattern = {
    name: /^[A-Za-z\s]+$/,
    religion: /^[A-Za-z\s]+$/,
    email: /^\S+@\S+\.\S+$/,
    contact: /^[6-9]\d{9}$/,
    altcontact: /^[6-9]\d{9}$/,
    occupation: /^[A-Za-z\s]+$/,
    aadhar: /^\d{12}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  // Existing validations
  for (let key in adopterData) {
    const value = adopterData[key];
    if (value === null || (typeof value === "string" && value.trim() === ""))
      errors[key] = "*Required field.";
  }

  if (Object.keys(errors).length > 0) {
    alert("Form Incomplete");
  }

  if (!regexPattern.name.test(adopterData.name)) errors.name = "*Use only alphabets and spaces.";
  if (!regexPattern.religion.test(adopterData.religion)) errors.religion = "*Use only alphabets and spaces.";

  const dob = new Date(adopterData.dob);
  const today = new Date();
  if (!adopterData.dob) {
    errors.dob = "*Date of Birth is required.";
  } else if (dob > today) {
    errors.dob = "*DOB cannot be in the future.";
  } else {
    const ageDiff = today.getTime() - dob.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 25) errors.dob = "*You must be at least \n 25 years old to adopt.";
  }

  if (!regexPattern.email.test(adopterData.email)) errors.email = "*Invalid Email address.";
  if (!regexPattern.contact.test(adopterData.contact)) errors.contact = "*Invalid Contact number.";
  if (!regexPattern.altcontact.test(adopterData.altcontact)) errors.altcontact = "*Invalid alternate Contact number.";

  const children = Number(adopterData.bioChildren);
  if (isNaN(children) || children < 0 || !Number.isInteger(children)) errors.bioChildren = "*Use positive integer.";
  if (!regexPattern.occupation.test(adopterData.occupation)) errors.occupation = "*Use only alphabets and spaces.";

  const salary = Number(adopterData.salary);
  if (isNaN(salary) || salary <= 0) errors.salary = "*Salary must be positive.";

  if (!regexPattern.aadhar.test(adopterData.aadhar)) errors.aadhar = "*Must be exactly 12 digits.";

  const file = adopterData.aadharimg;
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 2 * 1024 * 1024;
  if (!file) {
    errors.aadharimg = "*Aadhar image is required.";
  } else if (!validTypes.includes(file.type)) {
    errors.aadharimg = "*Only JPEG, JPG or PNG images are allowed.";
  } else if (file.size > maxSize) {
    errors.aadharimg = "*Image must be less than 2MB.";
  }

  if (!regexPattern.password.test(adopterData.pass)) errors.pass = "*Invalid Password";

// ===== Medical Section Validation =====

// Health status mandatory
if (!adopterData.healthStatus || adopterData.healthStatus.trim() === "") {
  errors.healthStatus =
    "*Please mention your serious medical conditions or write 'Healthy'.";
}

// Medical certificates (can be single or multiple)
const medFiles = adopterData.medicalCertificates;

if (!medFiles || !Array.isArray(medFiles) || medFiles.length === 0) {
  errors.medicalCertificates = "*Medical certificate is required.";
} else {
  for (let file of medFiles) {
    if (!validTypes.includes(file.type)) {
      errors.medicalCertificates =
        "*Only JPEG, JPG or PNG images are allowed for the certificate.";
      break;
    }
    if (file.size > maxSize) {
      errors.medicalCertificates =
        "*Each medical certificate image must be less than 2MB.";
      break;
    }
  }
}

  return errors;
}

export default FormValidator;
