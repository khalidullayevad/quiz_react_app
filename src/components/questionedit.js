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
        test_id :NaN,
        title:"",  
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        answer: NaN     
    };
    this.saveTest = this.saveTest.bind(this);  
    this.onValueChange=this.onValueChange.bind(this); 
   
  }

  saveTest = (e) => {
      console.log("HHIHIHs")
    e.preventDefault();    
        let task = { id:this.state.id,questionText : this.state.questionText, optionA: this.state.optionA,optionB: this.state.optionB, optionC: this.state.optionC,answer: this.state.answer}
        QuizzesServer.editQuestion(task).then((res) =>{
            let data = res.data;
            let tasks = this.state.tasks;
           
        })
        this.props.history.push('/addques/'+this.state.test_id);     
    
}

  changeQuestionTextHandler= (event) => {
    this.setState({questionText: event.target.value});
  }
  changeOptionAHandler= (event) => {
    this.setState({optionA: event.target.value});
  }
  changeOptionBHandler= (event) => {
    this.setState({optionB: event.target.value});
  }
  changeOptionCHandler= (event) => {
    this.setState({optionC: event.target.value});
  }
  onValueChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  componentDidMount() {
      
    
    QuizzesServer.geOneQuestion(this.state.id).then((res) => {
        let data = res.data;
        this.setState({title: res.data.questionForm.title})
         this.setState({test_id: res.data.questionForm.id})
        this.setState({questionText: res.data.questionText})  
        this.setState({optionA: res.data.optionA})    
        this.setState({optionB: res.data.optionB})    
        this.setState({optionC: res.data.optionC})    
        this.setState({answer: res.data.answer})    
      
    })
    console.log(this.state.questionText +"hi hi")

  
  }




  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    console.log(this.state.test_id+"I Diana")
   

    const { currentUser } = this.state;

            return (
                <div  style ={{background:'white'}}>
                    <div class="container-fluid">
                        <div class="row">
                            <Router>
                                <UserActions/>
                            </Router>
                    <div class="col pt-4 pr-4 pl-4">
                    <h2>{this.state.title}</h2>
                    <hr/>
                    <form >
                        
                        
                    <div style={{padding: "50px"}}>                   
                    <div class="input-group mb-3">  
                    <input type="text" class="form-control" 
                     onChange={this.changeQuestionTextHandler}
                     value={this.state.questionText}
                     name="questionText"
                     placeholder="Question text"  />
                    
                    </div>
                    <p>Write question options and choose correct answer</p>
           

                    <div className="row">
                    <div className="col-1">
                       <input  type="radio" 
                       class="form-control"  
                       type="radio"
                       value="1"
                       checked={this.state.answer ==1}
                       onChange={this.onValueChange}
                       id="male" name="answer" />
                    </div>
                    <div className="col-5">
                    <input type="text" class="form-control" 
                    onChange={this.changeOptionAHandler}
                    value={this.state.optionA}
                    name="optionA" placeholder="Option A" />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-1">
                       <input  type="radio" class="form-control" 
                       value="2"
                       checked={this.state.answer ==2}
                       onChange={this.onValueChange}
                       id="male" name="answer" />
                    </div>
                    <div className="col-5">
                    <input type="text" class="form-control" 
                     onChange={this.changeOptionBHandler}
                     value={this.state.optionB}
                    name="optionB" placeholder="Option B" />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-1">
                       <input  type="radio" class="form-control" 
                       value="3"
                       checked={this.state.answer ==3}
                       onChange={this.onValueChange}
                       id="male" name="answer" />
                    </div>
                    <div className="col-5">
                    <input type="text" class="form-control" 
                    name="optionC" placeholder="Option C" 
                    onChange={this.changeOptionCHandler}
                    value={this.state.optionC}
                    />
                    </div>
                    </div>
                    <div style={{float:"right"}}> 
                        <button 
                        onClick={this.saveTest}
                        className="btn btn-outline-info"> Add</button>

                    </div>
                    </div>
                    
                    
                    </form>

                </div>
            </div>
        </div>
    </div>
     
     
     
    );
  }
  
}

