import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {  BrowserRouter as Router, } from "react-router-dom";
import QuizzesServer from '../services/quizzesService'
import AuthService from "../services/auth.service";
import UserActions from './user.actions.page'
import '../css/card.css'

export default class AllTests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      results:[],
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    QuizzesServer.getResultTests(this.state.id).then((res)=>{
      this.setState({results: res.data});
    }
    )
  }
  

  renderQuizzes = quize =>{
    return <tr>
            
         <td> {quize.pessedBy.username}</td>   
         <td> {quize.questionForm.title}</td>
         <td> {quize.score}</td> 
         <td> {quize.countOfQuestions}</td> 
         <td> {quize.addedDate}</td>
          
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
                <th scope="col">Title</th>
                <th scope="col">Score</th>
                <th scope="col">Count of questions</th>
                <th scope="col">Passed date</th>
                
              </tr>
            </thead>
                {
                  this.state.results.map(
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

