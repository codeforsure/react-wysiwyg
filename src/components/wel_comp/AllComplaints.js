import React from 'react';
import ScrollArea from 'react-scrollbar';
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';
import { connect } from 'react-redux';
import { Markup } from 'interweave';
import { deleteComplaint } from "../../actions/complaintaction";
import Complaint from "./Complaint";
import {Link,Redirect} from "react-router-dom";
import Popup from 'reactjs-popup';
import Complaintview from "./viewComplaint";

class AllComplaints extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      complaints:[],
      isLoaded:false,
      viewopen: false,
      error :false
    }
  }
  componentDidMount(){
    const accessToken = read_cookie('json_response')
    const bearer = 'Bearer '+accessToken;
    const name = read_cookie('name');

    console.log('precheck bearer name',bearer,"   ",name);
    fetch('http://localhost:8080/complaint/get',{
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
         "username": name}),
    })

      .then(res=>res.json())
      .then(json=>{
        console.log('response complaint',json)
        if(json.status===401){
          this.setState({
            error:true,
          })
        }
        this.setState({
          isLoaded:true,
          complaints: json,
        })
              console.log(this.state);
      })
      .catch((error) => {
          console.log(error);
          this.setState({
            error:true,
          })
      });
  }
  onclick=(e)=>{
    e.preventDefault();
    console.log(e.target.id);
    this.props.deleteComplaint(e.target.id);
  }
  handleView=(e)=>{
    e.preventDefault();
    var data = this.state.complaints.filter(complaint => complaint.complaint === e.target.id);
    var id = data[0].complaint_id;
    var summary = data[0].summary;
    bake_cookie('complaint_id',id);
    localStorage.setItem('complaint',e.target.id);
    localStorage.setItem('summary',summary);
    console.log("data from localStorage",localStorage.getItem('summary'));
    this.setState({ viewopen: true });

    // this.props.onView(e.target.id);
  }
  render(){
    var {isLoaded,complaints,viewopen,error} = this.state;
    var obj = [...this.state.complaints];
      return (

        <ScrollArea horizontal={false}>
          <div className = 'allcomplaints'>
          {viewopen&&console.log('view',this.state.viewopen)}
          {viewopen&&<Redirect to= "/welcome/tinymce"/>}
          {error&&this.props.logout()}
          {error&&<Redirect to= "/error"/>}
          {this.props.isDeleteSuccess&&alert('complaint Successfully deleted')}
          {this.props.isDeleteSuccess&& <div>{window.location.reload()}</div>}
          {complaints.length?
        <div>
        {obj.sort((a,b)=>(a.complaint_id<b.complaint_id)?1:-1).map(complaint=>(
          <Complaintview Id ={complaint.complaint_id}  Summary = {complaint.summary}complaint = {complaint.complaint} onDelete = {this.onclick} onView ={this.handleView} />
        ))}</div>
          : <h1 align="center">No complaints Registered</h1>}
        </div>
        </ScrollArea>

      );
}
}

const mapStateToProps = (state)=> {
  return {
    accessToken: state.accessToken,
    isDeleteSuccess:state.isDeleteSuccess
  };
}
const mapDispatchToProps = (dispatch)=> {
  return{
     deleteComplaint:(id)=>dispatch(deleteComplaint(id)),
     logout :()=>{
       bake_cookie('login',false);
       delete_cookie('json_response');
       const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
       dispatch(action);
     }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllComplaints);
