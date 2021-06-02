import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import DataService from "../services/user.service";
import UserActions from './user.actions.page'
import {  BrowserRouter as Router, } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRPassword = this.onChangeRPassword.bind(this);
    this.onChangeOPassword = this.onChangeOPassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      username: AuthService.getCurrentUser().username,
      password: "",
      rpassword:"",
      opassword:"",
      successful: false,
      message: "",
      passwordfromd:AuthService.getCurrentUser.password,
    };
  }
  onChangePassword(e){
    this.setState({
        password: e.target.value
      });
}
onChangeRPassword(e){
    this.setState({
        rpassword: e.target.value
      });
}
onChangeOPassword(e){
    this.setState({
        opassword: e.target.value
      });
}
getPassword(){
  DataService.getPassword()
  .then(response => {
    this.setState({
      passwordfromd: response.data,
     
    });
    console.log(response.data);
   
  })
  .catch(e => {
    console.log(e);
  });
}
async updatePassword(e){
 
  e.preventDefault();

 console.log("I AM HERE!!!!!")
 
  if(this.state.rpassword===this.state.password){
     
         
          var newUser={
            oldpassword:this.state.opassword,
            newpassword:this.state.password
          }
          
          DataService.updatePassword(newUser)
          .then(response => {
            this.setState({
              message:response.data
            });
            console.log(response.data);
            if(this.state.message=="success"){
              alert("password changes")
          }
          else {
            alert("old password is not correct")
          }
          this.setState({
            passwordfromd:"",
            opassword:"",
            rpassword:"",
            password:""})
          })
          .catch(e => {
            console.log(e);
          });
          
      
      
  }
  else{
      alert("Passwords are not same  ")
  }
  
  
  
}

 

  render() {
   
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
   
    
    return (
      <div  style ={{background:'white'}}>
           <div class="container-fluid">
          <div class="row">
          <Router>
            <UserActions/>
          </Router>
          <div class="col pt-4 pr-4 pl-4">
          <form>
                <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-4 ">
                    <input type ="email"  className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"  readOnly placeholder="Email" value={currentUser.email}></input>
                    </div>
                    
                </div>
                {/* <div className="row mt-2 justify-content-center">
                    <div className="col-4 ">
                    <input type ="text"  name="username" onChange={this.onChangeFullname} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Fullname"  value={this.state.username}></input>
                    </div>
                    
                </div>
                <div className="row mt-3 d-flex justify-content-center" >
                    <button className="btn " style={{backgroundColor:'#154360',color:'white'}} onClick={this.updateFullname}>Update Profile</button>
                </div> */}
         
          </form>
          
          <div className="row mt-5 d-flex justify-content-center">
                    <div className="col-md-3">
                        <h3>Update Password </h3>
                    </div>
                </div>
          <form>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-4 ">
                    <input type ="password" name="opassword" onChange={this.onChangeOPassword} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Old Password" value={this.state.opassword}></input>
                    </div>
                    
                </div>
                
                <div className="row mt-2  d-flex justify-content-center">
                    <div className="col-4">
                    <input type ="password" name="rpassword"  onChange={this.onChangePassword} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Password" value={this.state.password}></input>
                    </div>
                    
                </div>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-4 ">
                        <input type ="password"  name="rpassword" onChange={this.onChangeRPassword} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Repeat Password"  value={this.state.rpassword}></input>
                    </div>
                    
                </div>
                <div className="row mt-5 d-flex justify-content-center">
                    <button className="btn  " style={{backgroundColor:'#154360',color:'white'}} onClick={this.updatePassword}>Update Password</button>
                </div>
         
          </form>
          
      </div>
      </div>
      </div>
      </div>
     
    );
  }
}