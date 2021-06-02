import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {  BrowserRouter as Router, } from "react-router-dom";
import QuizzesServer from '../services/quizzesService'
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import '../css/card.css'

export default class UserActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  
  }


  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

   
    return (


   
    
            <div class="col-2 collapse show d-md-flex bg-dark pt-4 pl-0 min-vh-100" id="sidebar">
               <ul class="nav flex-column flex-nowrap overflow-hidden">
              {showAdminBoard&&(
                   <>
                   <h4 class="mx-auto"style={{color:'white'}}>Admin Panel</h4>
                  
                   <li class="nav-item">
                   <a class="nav-link text-truncate" href="/users"><i class="fa fa-users"></i> <span class="d-none d-sm-inline">Users</span></a>
                   </li>
               <li class="nav-item">
                   <a class="nav-link text-truncate" href="/allmanage"><i class="fa fa-table"></i> <span class="d-none d-sm-inline">All Tests Manage</span></a>
               </li>
               
               <br/>
             
               <h4 class="mx-auto"style={{color:'white'}}>User Panel</h4>
              
               </>
                 )}
            
                 <li class="nav-item">
                     <a class="nav-link text-truncate" href="/profile"><span class="d-none d-sm-inline"> <i class="fa fa-user"></i>My account</span></a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link text-truncate" href="/alltests"><i class="fa fa-table"></i> <span class="d-none d-sm-inline">All Tests</span></a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link text-truncate" href="/addquestionform"><i class="fa fa-plus"></i> <span class="d-none d-sm-inline">ADD TEST</span></a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link text-truncate" href="/mycreatedtests"><i class="fa fa-table"></i> <span class="d-none d-sm-inline">My created tests</span></a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link text-truncate" href="/allmypassedtests"><i class="fa fa-table"></i> <span class="d-none d-sm-inline">My passed tests</span></a>
                 </li>
                 
             </ul>
                   </div>
                 
     
              
            
         
     
     
     
    );
  }
  
}

