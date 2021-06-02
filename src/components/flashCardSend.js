import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {  BrowserRouter as Router, } from "react-router-dom";
import QuizzesServer from '../services/quizzesService'
import AuthService from "../services/auth.service";
import UserActions from './user.actions.page'
import '../css/card.css'
import FlashCard from './flashcard'

export default class FlashCardSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.match.params.id,
        test_id : NaN,
        title:"",
             
        questions:[{}],       
        count: NaN,
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        answer: NaN     
    };
   
  }




 

  componentDidMount() {
    
    QuizzesServer.getOneTest(this.state.id).then((res) => {
        let data = res.data;
        this.setState({title: res.data.title})  
        this.setState({count: res.data.count})          
        this.setState({ test_id: data.id})
    })

    QuizzesServer.getQuestionAll(this.state.id).then((res) => {               
    this.setState({ questions : res.data })
   })
  }

  renderQuizzes = quize =>{
    const answer = [quize.optionA, quize.optionB,quize.optionC]
    console.log(answer)
   
    return<div class="col-4">
    <div class="card mb-4">
    
        
       <FlashCard frontSide={quize.questionText} backSide={answer[quize.answer-1]}/>

   
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
                        <h2>Title: {this.state.title}</h2>
                    
                    <h4>All questions </h4>
                    <div class="row ">
                    {
                         this.state.questions.map(
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

