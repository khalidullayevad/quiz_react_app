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
        name : "",
        count: NaN,
     
    };
    this.saveTest = this.saveTest.bind(this);
  }

  saveTest = (e) => {
    e.preventDefault();
    
        let task = { title : this.state.name, count: this.state.count}
        QuizzesServer.addQuestionForm(task).then((res) =>{
            let data = res.data;
            let tasks = this.state.tasks;
           
        })
        this.props.history.push('/mycreatedtests');
       
    
}

  changeTestNameHandler= (event) => {
    this.setState({name: event.target.value});
  }
  changeCountHandler= (event) => {
    this.setState({count: event.target.value});
  }

  componentDidMount() {
    
    
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
                    <h2>ADD TEST</h2>
                    <hr/>
                    <form>
                        
                    <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Task name" name="name"
                    value={this.state.name} onChange={this.changeTestNameHandler}
                    aria-label="Recipient's username" aria-describedby="button-addon2"/>

                    
                    
                  </div>
                  <h4>Add count of randomize questions or the number of questions to be asked randomly</h4>
                  <div class="input-group mb-3">
                  <input type="number" class="form-control" placeholder="Count of randomize questions" name="count"
                    value={this.state.count} onChange={this.changeCountHandler}
                    aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    </div>
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" 
                    onClick={this.saveTest}
                    id="button-addon2">SAVE</button>
                  </div>
                  </form>


                </div>
            </div>
        </div>
    </div>
     
     
     
    );
  }
  
}

