import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {  BrowserRouter as Router, } from "react-router-dom";
import QuizzesServer from '../services/quizzesService'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import UserActions from './user.actions.page'
import '../css/card.css'
import Question from "./question/question";

export default class UserManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users:[],
      roles:[{}],
      
      redirect: null,
      userReady: false,
     
      currentUser: { username: "" }
    };
  }
  deleteForm(id){
    console.log(id  + " idid")
    QuizzesServer.deleteForm(id);
 
    
}
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    UserService.getAllUsers().then((res)=>{
      this.setState({users: res.data,
        
       
      });
    }
    )
  }
  cardView(id){
    this.props.history.push(`/quiz/${id}`);
  }
  myTestResult(id){
    this.props.history.push(`/myTestResult/${id}`);
  }
  
  editView(id){
    this.props.history.push(`/addques/${id}`);
  }
  renderQuizzes = quize =>{
    return <tr>
            
                 
         <td> {quize.username}</td>
         <td> {quize.email}</td> 
         <td> {quize.roles.map(role=><p>{role.name}</p>)}</td> 
         {/* {quize.roles.map(role=><>{   !role.name.includes("ROLE_ADMIN")  &&(<td><button>Add role Admin</button></td> )}</>)} */}
         {/* {quize.roles.includes("ROLE_ADMIN") &&(
           <td><button>Add role Admin</button></td> 
         )} */}
         
         
         
         {/* <td><button class="btn btn-danger mb-4"  onClick={()=>this.editView(quize.id)}>Edit</button>  </td> 
         <td><button class="btn btn-success mb-4"  onClick={()=>this.deleteForm(quize.id)}>Delete</button>  </td>  */}
          </tr>
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
            <table class="table table-hover mr-4 container">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email </th>
                <th scope="col">Roles</th>
                {/* <th scope="col"> Edit</th>
                <th scope="col">Delete </th> */}
                
                
              </tr>
            </thead>
                {
                  this.state.users.map(
                      quize =>{                             
                      return this.renderQuizzes(quize)
                      }
                            
                        )
                 } 
            </table>  
              
            </div>
            
            </div>
            </div>
            </div>
     
     
     
    );
  }
  
}

