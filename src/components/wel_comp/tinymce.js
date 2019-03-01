import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {Redirect} from "react-router-dom";
import './header.css';
import { Complaints } from "../../actions/complaintaction";
import { updateComplaint } from "../../actions/complaintaction";
import { connect } from 'react-redux';
import AllComplaints from "./AllComplaints";
import {Link} from "react-router-dom";
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';

const name=read_cookie('name');
class Complainttiny extends React.Component {
  state = {
    content: localStorage.getItem('complaint'),
    summary: localStorage.getItem('summary'),
    update : false,
  }
  onChange=(evt)=>{
    console.log("onChange: ", evt.target.getContent());
    var newContent = evt.target.getContent();
    this.setState({
      content: newContent
    });
  }
  onChangesum=(e)=>{
    console.log('changed',e.target.value);
    this.setState({
      summary:e.target.value,
    })
  }
  componentDidMount(){
    if(localStorage.getItem('complaint') !== ''||localStorage.getItem('summary')!== '')
    {
      console.log('update staus changed');
      this.setState({
          update:true,
      })
    }
    console.log('complaint changed');
    localStorage.setItem('complaint','')
    localStorage.setItem('summary','')
  }
  onSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state.content,"from content")
    if(this.state.update){
      var id = read_cookie('complaint_id');
      console.log(id);
      this.props.updateComplaint(id,this.state.content,this.state.summary);
    }
    else{
      this.props.Complaints(this.state.content,this.state.summary);
    }
  }
  render(){
    let {isComplaintSuccess,complaintError,isUpdateSuccess,updateError} = this.props;
    return (
      <div className= 'editor' align='center' onSubmit ={this.onSubmit}>
        {isComplaintSuccess&&alert('complaint Successfully submited')}
        {isComplaintSuccess&&<div>{window.location.reload()}</div>}
        {isComplaintSuccess&&<div><Redirect to='/welcome/allcomplaint'/></div>}
        {isUpdateSuccess&&alert('complaint Successfully updated')}
        {isUpdateSuccess&&<div>{window.location.reload()}</div>}
        {isUpdateSuccess&&<div><Redirect to='/welcome/allcomplaint'/></div>}
        {complaintError&&alert('cannot register complaint')}
        {complaintError&&this.props.logout()}
        {complaintError&&<div><Redirect to={"/error"} /></div>}
        {updateError&&alert('cannot update complaint')}
        {updateError&&this.props.logout()}
        {updateError&&<div><Redirect to={"/error"} /></div>}
      <h1 align='center'>Drop Your Content Here</h1>
      <form className= 'editor1'>
      <h3 align='left'>SUMMARY:</h3>
      <input type='text' className= 'input1' onChange={this.onChangesum} maxlength="200" placeholder="enter summary ........." value = {this.state.summary}required/>
      <h3 align='left'>CONTENT:</h3>
      <Editor
      apiKey='63tc2k8a1hf0lv3lb757q9vvdexbxqts6aggbb89dky9kjid'
      // cloudChannel = 'stable'
      initialValue = {this.state.content}
        init={{
          selector: 'textarea',
  height: 400,
  menubar: 'file edit view insert format tools tc',
  themes: "modern",
  menu: {
    tc: {
      title: 'Comments',
      items: 'addcomment showcomments deleteallconversations'
    }
  },
   // external_plugins: {
   //   'equation':'http://0.0.0.0:8000/plugin.min.js'
   // },
  plugins: 'autosave tinycomments print preview powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
  toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor image addcomment| link codesample | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat help ',
  image_advtab: true,
  image_caption: true,
  tinycomments_mode: 'embedded',
  tinycomments_author: name,
content_style: '.mce-annotation { background: #fff0b7; } .tc-active-annotation {background: #ffe168; color: black; }',

        }}
        onChange={this.onChange}
      />
      <button  className="but1" type="submit" >{this.state.update ? <div>Update Complaint</div> :<div>Submit Complaint</div>}</button>
      </form>
      </div>
    );
  }
  }
  const mapStateToProps = (state)=> {
  return {
    isComplaintSuccess: state.isComplaintSuccess,
    complaintError :state.complaintError,
    isUpdateSuccess :state.isUpdateSuccess,
    updateError : state.updateError
  };
  }
  const mapDispatchToProps = (dispatch) => {
  return {
    Complaints :(complaint,summary)=>{dispatch(Complaints(complaint,summary))},
    updateComplaint:(id,complaint,summary)=>{dispatch(updateComplaint(id,complaint,summary))},
    logout :()=>{
      bake_cookie('login',false);
      delete_cookie('json_response');
      const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
      dispatch(action);
    }
  }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Complainttiny);
