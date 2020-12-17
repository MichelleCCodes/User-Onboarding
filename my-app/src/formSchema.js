import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("username is required")
    .min(3, "name must be 3 chars long"),
  email: yup.string().email("must be an email").required("email is required"),
  password: yup
    .string()
    .required("password is required"),
  //This is all we need for checkboxes
  agree: yup.boolean().oneOf([true], "Must agree to terms"),
});