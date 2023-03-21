const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phoneno = !isEmpty(data.phoneno) ? data.phoneno : "";
// Name checks
  if (Validator.isEmpty(data.name)) 
  {
    errors.name = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) 
  {
    errors.email = "Email field is required";
  } 
// Password checks
  if (Validator.isEmpty(data.password)) 
  {
    errors.password = "Password field is required";
  }
  //phoneno checks
  if (Validator.isEmpty(data.phoneno)) 
  {
    errors.phoneno = "Phoneno field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};