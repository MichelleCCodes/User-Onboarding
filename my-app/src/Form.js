import React from "react";

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const onChange = (event) => {
    /* THIS ALSO WORKS WITH CHECKBOXES */
    const { name, value, type, checked } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div className="form-group submit">
        <h2>Add a User</h2>

        {/* DISABLE THE BUTTON */}
        <button disabled={disabled}>submit</button>

        <div className="errors">
          {/* RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.agree}</div>
        </div>
      </div>

      <div className="form-group inputs">
        <h4>User information</h4>

        {/* ////////// TEXT INPUTS ////////// */}
        <label>
          Name&nbsp; 
          <input
            value={values.name}
            onChange={onChange}
            name="name"
            type="text"
          />
        </label>

        <label>
          Email
          <input
            value={values.email}
            onChange={onChange}
            name="email"
            type="text"
          />
        </label>

        <label>
          Password
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="text"
          />
        </label>
        </div>

      <div className="form-group checkboxes">

        {/* ////////// CHECKBOXES ////////// */}

        <h4>Terms of Agreement</h4>

        <label>
          Do you agree to these terms? 
          <input
            type="checkbox"
            name="agree"
            // let the checkbox be checked if the value inside state resolves to true!
            checked={values.agree}
            onChange={onChange}
          />
        </label>
        
      </div>
    </form>
  );
}
