import React,{Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {Redirect} from "react-router-dom";
import './header.css';
import { Complaints } from "../../actions/complaintaction";
import { updateComplaint } from "../../actions/complaintaction";
import { connect } from 'react-redux';
import AllComplaints from "./AllComplaints";
import {Link} from "react-router-dom";
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';
CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.11.2/full-all/ckeditor.js';
class Complaintck4 extends  Component{
  state = {
    content: localStorage.getItem('complaint'),
    summary: localStorage.getItem('summary'),
    update : false,
  }
  onChange=(evt)=>{
    console.log("onChange: ", evt.editor.getData());
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    });
  }
  onChangesum=(e)=>{
    console.log('changed',e.target.value);
    this.setState({
      summary:e.target.value
    });
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
      alert('complaint-'+id+'  Successfully updated');
      this.props.updateComplaint(id,this.state.content,this.state.summary);
    }
    else{
      alert('complaint Successfully submited');
      this.props.Complaints(this.state.content,this.state.summary);
    }
  }
  render(){
    let {isComplaintSuccess,complaintError,isUpdateSuccess,updateError} = this.props;
    return (
      <div className= 'editor' align='center' onSubmit ={this.onSubmit}>
      <form className= 'editor1'>
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
        <h3 align='left'>SUMMARY:</h3>
        <input type='text' className= 'input1' maxlength="200" onChange={this.onChangesum} placeholder="enter summary ........." required/>
        <h3 align='left'>Content:</h3>
        <CKEditor
        data={this.state.content}
        onChange={this.onChange}
        config={{
          
           height:'300px',
           width:'100%',

           extraPlugins:'codesnippet,mathjax,uploadfile',
           codeSnippet_theme : 'school_book',
         }}
         plugins={{
           addExternal:'',
         }}
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
      delete_cookie('json_response');
      const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Complaintck4);
