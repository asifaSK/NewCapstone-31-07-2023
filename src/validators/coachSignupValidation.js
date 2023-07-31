export const coachValidation = {};

coachValidation.validateName = (value) => {
    return value.length>=3 && value.length<=50
}

coachValidation.validatePassword = (value) => {
    return value.length>=5 && value.length<=10
}

coachValidation.validateMobileNumber = (value) => {
    return !isNaN(value) && value.length===10
}


coachValidation.validateDOB = (value) => {
    const birthYear = Number(value.slice(value.length-4, value.length));
    const currentDate = new Date().toLocaleDateString();
    const currentYear = Number(currentDate.slice(currentDate.length-4, currentDate.length));

    const age = currentYear - birthYear;
    return age>20 && age<60
}

coachValidation.validateGender = (value) => {
    return value !== ""
}

