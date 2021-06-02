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
      search:"",
      quizzes:[],
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    QuizzesServer.getAllQuizzes().then((res)=>{
      this.setState({quizzes: res.data});
    }
    )
  }
  cardView(id){
    this.props.history.push(`/quiz/${id}`);
}
flashCard(id){
  this.props.history.push(`/flashCard/${id}`);
}
searchChange=e=>{
  this.setState({search: e.target.value})
}
editView(id){
  this.props.history.push(`/addques/${id}`);
}
  renderQuizzes = quize =>{
    const {search} =this.state;
    if(search !=="" && quize.title.toLowerCase().indexOf(search.toLowerCase()) ===-1  ){
      return null;
    }
    return <div class="col-4">
    <div class="card mb-4">
    
        <div class="container">                
          <h3><b>{quize.title}</b></h3>
          <br/> 
          <p>Count of questions: {quize.count}</p>
          <p> Author: {quize.user.username}</p> 
          <button class="btn btn-success mb-4"  onClick={()=>this.cardView(quize.id)}>Pass the test</button>   
          <button class="btn btn-primary mb-4 ml-2"  onClick={()=>this.flashCard(quize.id)}>Flash Card</button>  
           
          {this.state.currentUser.id == quize.user.id
        ? <button class="btn btn-danger mb-4 ml-2"  onClick={()=>this.editView(quize.id)}>Edit</button> 
        : <input type="hidden"/> 
          }
          
         
        </div>
    </div>
    </div>
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
            <h2>All tests</h2>
            <div class="input-group mb-3">
                <input type="text" icon="search" class="form-control" placeholder="Search by task name" onChange={this.searchChange} />
                {/* <button class="btn btn-outline-primary" type="button" id="button-addon2">SEARCH</button> */}
              </div>
              
        <div class="row "> {
                         this.state.quizzes.map(
                             quize =>{                             
                             return this.renderQuizzes(quize)
                             }
                            
                        )
                     }   
                </div>
            </div>
            
            </div>
            </div>
            </div>
     
     
     
    );
  }
  
}

