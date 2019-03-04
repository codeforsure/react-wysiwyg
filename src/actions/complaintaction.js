import Promise from 'es6-promise';
import { read_cookie } from 'sfcookies'

const accessToken = read_cookie('json_response')
const bearer = 'Bearer '+accessToken;
const register={
  userName:read_cookie('name'),
}
function setComplaintSuccess(isComplaintSuccess)
{
    return{
      type: "COMPLAINT_SUCCESS",
      isComplaintSuccess
    };
}
function setComplaintError(complaintError)
{
    return{
      type: "COMPLAINT_ERROR",
      complaintError
    };
}
function setDeleteSucess(isDeleteSuccess)
{
    return{
      type: "DELETE_SUCCESS",
      isDeleteSuccess
    };
}
function setDeleteError(deleteError)
{
    return{
      type: "DELETE_ERROR",
      deleteError
    };
}
function setUpdateSucess(isUpdateSuccess)
{
    return{
      type: "UPDATE_SUCCESS",
      isUpdateSuccess
    };
}
function setUpdateError(updateError)
{
    return{
      type: "UPDATE_ERROR",
      updateError
    };
}
export function Complaints(complaint,summary){
  console.log('test summary',summary);
    return dispatch => {
      dispatch(setComplaintSuccess(false));
      ComplaintRequest(complaint,summary)
      .then(success =>{
        dispatch(setComplaintSuccess(true));
      })
      .catch(err=>{
        dispatch(setComplaintError(err));
      })
  };
}
export function deleteComplaint(id){
    return dispatch => {
      dispatch(setDeleteSucess(false));
      deleteRequest(id)
      .then(sucess =>{
        dispatch(setDeleteSucess(true));
      })
      .catch(err=>{
        dispatch(setDeleteError(err));
      })
    }
}
export function updateComplaint(id,complaint,summary){
    return dispatch => {
      dispatch(setUpdateSucess(false));
      updateRequest(id,complaint,summary)
      .then(sucess =>{
        dispatch(setUpdateSucess(true));
      })
      .catch(err=>{
        dispatch(setUpdateError(err));
      })
    }
}
function deleteRequest(id){
  return new Promise((resolve,reject) =>{
  fetch('http://localhost:8080/complaint/delete', {
     method: 'post',
     headers: {
       'Authorization': bearer,
       'Content-Type':'application/json'},
     body: JSON.stringify({
      "complaint_id": id
    })
  }).then((res)=>{
    if(res.status === 200)
     return resolve(true);
     if(res.status=== 401)
     return reject(new Error('401'))
  }).catch((err)=>{
    console.log("error",err);
    return reject(new Error('Cannot Delete Complaint'));
 });
})
}
function updateRequest(id,complaint,summary){
  return new Promise((resolve,reject) =>{
  fetch('http://localhost:8080/complaint/update', {
     method: 'post',
     headers: {
       'Authorization': bearer,
       'Content-Type':'application/json'},
     body: JSON.stringify({
      "complaint_id": id,
      "complaint" : complaint,
      "summary":summary,
      "register":register,
    })
  }).then((res)=>{
    console.log('update response',res)
    if(res.status === 200)
     return resolve(true);
     if(res.status=== 401)
     return reject(new Error('401'))
  }).catch((err)=>{
    console.log("error",err);
    return reject(new Error('Cannot update Complaint'));
 });
})
}
function ComplaintRequest(complaint,summary){
  return new Promise((resolve,reject) =>{
    console.log(complaint,summary,'...',bearer);
  fetch('http://localhost:8080/complaint', {
   method: 'post',
   headers: {
     'Authorization': bearer,
     'Content-Type':'application/json'},
   body: JSON.stringify({
    "complaint": complaint,
    "summary":summary,
    "register":register,
  })
}).then((res) => {
  console.log('json converted');
  console.log(res);
  return res;
})
 .then(res=>{
   console.log("sucess");
   console.log(res.status);
   if(res.status === 200)
    return resolve(true);
    if(res.status=== 401)
    return reject(new Error('401'))
 })
 .catch((err)=>{
   console.log("error",err);
   return reject(new Error('Cannot Register Complaint'));
});
  });
}
