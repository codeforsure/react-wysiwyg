import React from 'react';
import {Redirect} from "react-router-dom";
import './header.css';
import { Complaints } from "../../actions/complaintaction";
import { updateComplaint } from "../../actions/complaintaction";
import { connect } from 'react-redux';
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Promise from 'es6-promise';

class UploadAdapter {
    constructor( loader ) {
      this.loader = loader;
    }
    upload() {
        const data = new FormData();
        data.set('UPLOADCARE_PUB_KEY', 'b0413732680291f6a6ae')
        data.set('UPLOADCARE_STORE', '1')
        data.append('typeOption', 'upload_image');
        data.append('file', this.loader.file);
        return new Promise((resolve, reject) => {
            fetch('https://upload.uploadcare.com/base/', {
                method: 'POST',
                body: data
            }).then(res =>
              res.json()
            ).then(res => {
              console.log(res.file);
              var resData = res;
              resData.default = 'https://ucarecdn.com/'+res.file+'/';

              console.log(resData);
              resolve(resData);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
}
class Complaint extends React.Component{
  state = {
    content: localStorage.getItem('complaint'),
    update : false,
    summary: localStorage.getItem('summary'),
  }
  onChange=(evt,editor)=>{
    console.log("onChange: ", editor.getData());
    var newContent = editor.getData();
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
      {isComplaintSuccess&&<div>{window.location.reload()}</div>}
      {isUpdateSuccess&&<div><Redirect to='/welcome/allcomplaint'/></div>}
      {complaintError&&this.props.logout()&&<div><Redirect to={"/error"} /></div>}
      {updateError&&this.props.logout()&&<div><Redirect to={"/error"} /></div>}
      <h1 align='center'>Drop Your Content Here</h1>
        <h3 align='left'>SUMMARY:</h3>
        <input type='text' className= 'input1' maxlength="200" onChange={this.onChangesum} placeholder="enter summary ........." required />
        <h3 align='left'>CONTENT:</h3>
      <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.content}
                    onChange={this.onChange}
                    onInit={ editor => {
                      editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
                        return new UploadAdapter( loader );
                      };
                    } }
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
export default connect(mapStateToProps, mapDispatchToProps)(Complaint);
