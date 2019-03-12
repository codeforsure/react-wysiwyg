import React from 'react';
import './forms.css';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { Register } from "../actions/registeraction";
import {Redirect} from "react-router-dom";
import PasswordMask from 'react-password-mask';

class Registerform extends React.Component {
    state={
      Name:'',
      Email:'',
      username:'',
      password:'',
      cpassword:'',
      error:{},
      formValid: false,
    }
    validateForm() {
      let errors = {};
      let formIsValid = true;
      if (this.state.Name.length===0) {
        formIsValid = false;
        errors["Name"] = "*Name cannot be empty";
      }
      if (this.state.username.length<5) {
        formIsValid = false;
        errors["username"] = "*username should be atleast 5 characters";
      }
      if (this.state.username.length===0) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }
      if (typeof this.state.username !== "undefined") {
        if (!this.state.username.match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }


      if (typeof this.state.Email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.Email)) {
          formIsValid = false;
          errors["Email"] = "*Please enter valid email-ID.";
        }
      }
      if (this.state.Email.length===0) {
        formIsValid = false;
        errors["Email"] = "*Please enter your email-ID.";
      }

      if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }
      if (typeof this.state.password !== "undefined") {
        if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Password must contain a Uppercase&Lowercase.";
        }
      }
      if(this.state.password.length<8){
        formIsValid = false;
        errors["password"] = "*Password must contain atleast 8 characters.";
      }
      if(this.state.password!==this.state.cpassword){
        formIsValid = false;
        errors["cpassword"] = "*Password do not match.";
      }
      this.setState({
        error: errors
      });
      return formIsValid;
    }
    handleChange=(evt)=>{
      console.log("name",evt.target.name);
      console.log("value",evt.target.value);
      this.setState({
      [evt.target.name]: evt.target.value
      });
    }
    onSubmit=(e)=>{
      e.preventDefault();
      console.log("submit",this.state.Name,this.state.Email,this.state.username,this.state.password);
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          fields["mobileno"] = "";
          fields["password"] = "";
          this.props.Register(this.state.Name,this.state.Email,this.state.username,this.state.password);
      }

    }
    render(){
    return(
          <div className='main'>
           <div className='Mainform' onSubmit ={this.onSubmit}>

           {this.props.isRegisterSuccess&&<Redirect to='/' />}
              <form >
                <header className="header-block">
                <h1 className="title">Create account</h1>
                </header>
                <Input type='text' name='Name' placeholder='Full Name' onChange = {this.handleChange} />
                <div className='errors'>{this.state.error['Name']}</div>
                <Input type='text' name='Email' placeholder='Email' onChange = {this.handleChange}/>
                <div className='errors'>{this.state.error['Email']}</div>
                <Input type='text' name='username' placeholder='username' onChange = {this.handleChange}/>
                <div className='errors'>{this.state.error['username']}</div>
                  <PasswordMask
                    id="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className='Input'
                  />
                <div className='errors'>{this.state.error['password']}</div>
                <Input type='password' name='cpassword' placeholder='confirm password' onChange = {this.handleChange}/>
                <div className='errors'>{this.state.error['cpassword']}</div>
                <button className='formbutton' type="submit"> Create</button>
              </form>
              <p >Already a user?<Link to={"/"} >Sign in</Link></p>
           </div>
           </div>
           );
    }
}
function Input(props) {
    return <div className='Input'>
              <input type={ props.type } name={ props.name } size='5' onChange={props.onChange} placeholder={ props.placeholder }  autoComplete='false'/>
              <label htmlFor={ props.name } ></label>
           </div>
}
const mapStateToProps = (state)=> {
  return {
    isRegisterSuccess: state.isRegisterSuccess,
    loginError : state.loginError
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    Register:(Name,Email,username,password) => dispatch(Register(Name,Email,username,password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registerform);
