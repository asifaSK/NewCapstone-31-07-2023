export const userValidation = {};
// userValidation.validateName, userValidation.validatePassword, userValidation.validateMobileNumber, userValidation.validateEmail, userValidation.validateDOB, userValidation.validateGender, userValidation.validatePincode

userValidation.validateName = (value) => {
    return value.length>=3 && value.length<=50
}

userValidation.validatePassword = (value) => {
    return value.length>=5 && value.length<=10
}

userValidation.validateMobileNumber = (value) => {
    return !isNaN(value) && value.length===10
}

userValidation.validateEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
    // return value !== ""
}

userValidation.validateDOB = (value) => {
    const birthYear = Number(value.slice(value.length-4, value.length));
    const currentDate = new Date().toLocaleDateString();
    const currentYear = Number(currentDate.slice(currentDate.length-4, currentDate.length));

    const age = currentYear - birthYear;
    return age>=20 && age<=100
}

userValidation.validateGender = (value) => {
    return value !== ""
}

userValidation.validatePincode = (value) => {
    return !isNaN(value) && value.length===6
}
