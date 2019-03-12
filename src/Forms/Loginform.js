import React from 'react';
import './forms.css';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from "../actions/useractions";
import PasswordMask from 'react-password-mask';

class Loginform extends React.Component {;
  state = {
    name: '',
    password: ''
  }
  onChangeName = e =>{
    console.log(e.target.value);
    this.setState({name:e.target.value});
  }
  onChangepass = e =>{
    this.setState({password:e.target.value});
  }
  // componentDidUpdate = () => {
  //
  //   console.log('cookie',read_cookie('login'));
  // }
  render() {
    let {isLoginPending,isLoginSuccess,loginError} = this.props;
    console.log(isLoginSuccess);
    return(
          <div className='main'>
           <div className='Mainform' onSubmit ={this.onSubmit}>
           {isLoginPending&&<div className="loader"></div>}
           { loginError&&<div className='errors' align='center'>{loginError.message}</div>}
           {isLoginSuccess===true&&<div><Redirect to={"/welcome/home"} /></div>}
              <form  >
                <header className="header-block">
                <h1 className="title">Sign in</h1>
                <h2 className="sub-title">to your account</h2>
                </header>
                <Input type='text' name='name' placeholder='Enter username' onChange={this.onChangeName} value={this.state.name}/>
                  <PasswordMask
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.onChangepass}
                    className='Input'
                    buttonClassName='pshow'
                  />
                {isLoginPending?<div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
  :<button className='formbutton' type="submit"> Sign In</button>}
              </form>
                <p className="larger-note">Don't have an account? <Link to={"/register"}>Sign up</Link></p>
           </div>
           </div>
           );
  }
  onSubmit=(e)=>{
    e.preventDefault();
    let {name,password}=this.state;
    console.log(name+'..submit..'+password);
    this.props.login(name,password);
  }
}
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } onChange={this.props.onChange} required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }
}
const mapStateToProps = (state)=> {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError : state.loginError
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    login:(name,password) => dispatch(login(name,password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loginform);
