import './App.css';
import Form from './Form';
import User from './User';
import React, { useState, useEffect } from 'react';
import schema from "./formSchema";
import axios from "axios";
import * as yup from "yup";

//////////////// INITIAL STATES ////////////////
const initialFormValues ={
  name:"", 
  email:"", 
  password:"",
  ///// CHECKBOXES /////
  agree: false, 
};

const initialFormErrors = {
  name:"", 
  email:"",
  password:"", 
  ///// CHECKBOXES /////
  agree: false, 
}

const initialUsers = []; 
const initialDisabled = true;

function App() {

//////////////// STATES ////////////////
const [users, setUsers] = useState(initialUsers);//array of user objects
const [formValues, setFormValues] = useState(initialFormValues);//object
const [formErrors, setFormErrors] = useState(initialFormErrors);//object
const [disabled, setDisabled] =useState(initialDisabled);//boolean

//////////////// HELPER FUNCTIONS ////////////////

//AXIOS GET REQUEST 
const getUsers = () => {
axios 
  .get("https://reqres.in/api/users")
  .then(res => {
    setUsers(res.data);
  })
  .catch( error => {
    console.log('error!');
  })
}

//AXIOS POST REQUEST 
const postNewUser = (newUser) => {
axios.post('https://reqres.in/api/users', newUser)
.then(res => {
  setUsers([res.data,...users]);
  setFormValues(initialFormValues); 
})
.catch(err => {
  console.log(err)
})
}

//////////////// EVENT HANDLERS ////////////////
const inputChange = (name, value) => {
yup 
.reach(schema, name)
.validate(value)
.then(()=> {
  setFormErrors({
    ...formErrors,
    [name]:"",
  })
}) 
.catch(err => { //returned from yup that we created in our schema
  setFormErrors({
    ...formErrors,
    [name]: err.errors[0], //validation error from schema
  })
})
setFormValues({
  ...formValues, 
  [name]: value, //NOT AN ARRAY
})
}; 

const formSubmit = () => {
  const newUser = {
    name: formValues.name.trim(), 
    email: formValues.email.trim(), 
    password: formValues.password.trim(),
  }

  postNewUser(newUser);
};

  //////////////// SIDE EFFECTS ////////////////
useEffect (() => {
  getUsers();
}, []);

useEffect( ()=> {
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid);
  });
}, [formValues]); 

  return (
    <div className="App">
      <header>
        <h1>Sign Up With Us!</h1>
      </header>

      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
      />

      {/* {users.map(user => {
        return <User key={user.name} details={user} />;
      })} */}
    </div>
  );
}

export default App;