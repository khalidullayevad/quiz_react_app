import React, {Component} from 'react';
import Question from './question/question';
import Answer from './answer/answer';
import './QuizMain.css';
import QuizzesServer from '../services/quizzesService'
import UserActions from './user.actions.page'
import ScoreBar from './ScoreBar/index'
import {  BrowserRouter as Router, } from "react-router-dom";

import AuthService from "../services/auth.service";

class Quiz extends Component {
    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id,
                test_id : NaN, 
                showModeratorBoard: false,
                showAdminBoard: false,
                currentUser: undefined,
                title: "",
                count:0,
                questions:[{}],                
                clickedAnswer: 0,
                answers: [],
                step: 0,
                score: 0
               
            };
          
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
        QuizzesServer.getOneTest(this.state.id).then((res) => {
            let data = res.data;
            this.setState({title: res.data.title})            
            this.setState({ test_id: data.id})
            this.setState({count: data.count})
        })

        QuizzesServer.getQuestions(this.state.id).then((res) => {               
        this.setState({ questions : res.data })
       })
        
    }
    saveResult = (e) => {
        e.preventDefault();
        
            let task = {id : this.state.id,  score : this.state.score, countOfQuestions: this.state.questions.length}
            QuizzesServer.addResult(task).then((res) =>{
                let data = res.data;
                let tasks = this.state.tasks;
               
            })
            this.props.history.push('/alltests');
           
        
    }
    
    // the method that checks the correct answer
    checkAnswer = answer => {
        const { questions, step, score } = this.state;
        console.log(questions[step].answer+"currect answer")
        console.log(answer+1 +"option")
        var integer = parseInt(answer);
        console.log(integer+1 +"integer")
        let ans = answer+1
        console.log(ans+"value")
        if(integer+1 == questions[step].answer){
            console.log(integer+1 + "option")
            this.setState({
                score: score + 1,
                correctAnswer: questions[step].answer,
                clickedAnswer: integer+1
            });
        }else{
            console.log( parseInt(answer)+"click")
            console.log(answer+1 + "in correcoption")
            this.setState({
                correctAnswer: 0,
                clickedAnswer: parseInt(answer)+1
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }


    render(){
       
        let { questions,  correctAnswer, clickedAnswer, step, score } = this.state;
        console.log(questions)  
        console.log(this.state.currentUser)
        console.log(score +"SCORE")
        console.log(this.state.count +"questions.count")
        console.log(step+1 +"step")

        if(questions.length == 0){
            
            return(
                <div style ={{background:'white'}}>
                     <div class="container-fluid">
                        <div class="row">
                            <Router>
                                <UserActions/>
                            </Router>
                            <div class="col pt-4 pr-4 pl-4">
                               {console.log(questions.length)}
                                <h2>Quize titile: {this.state.title}</h2>
                                <hr/>
                            
                             
                                <div className="Content">
                
                                <div className="finalPage">
                           
                            
                                            
              
                           <h1>In this test have not questions </h1>
                                           
                                           <p>Thank you!</p>
                                           </div>
                                           </div>
                                           </div>
                       
                     
                               </div>
                                </div>
                                </div>
                                );
        }
       else{
       
        // answers = [questions[step].optionA, questions[step].optionB,questions[step].optionC]
        //console.log(questions[0].optionA) 

        return(
            <div style ={{background:'white'}}>
                 <div class="container-fluid">
                    <div class="row">
                        <Router>
                            <UserActions/>
                        </Router>
                        <div class="col pt-4 pr-4 pl-4">
                           {console.log(questions.length)}
                            <h2>Quize titile: {this.state.title}</h2>
                            <hr/>
            <div className="Content">
                
                {step+1  <= questions.length ? 
                    (<>
                    <h4>{step+1} ------question  of { questions.length}</h4>
                        <Question
                           question={questions[step].questionText}
                        />
                        {
                           
                        }
                        
                        <Answer
                            answer ={[questions[step].optionA, questions[step].optionB,questions[step].optionC]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        /> 
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(questions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                       
                    <ScoreBar
                    
                                score={score}
                                questionCount={this.state.count}
                                questionNumber={step}
                    />

                    </>) : (
                        
                        <div className="finalPage">
                           
                            
                                            
                        <form>
                            <h1>You have completed the quiz!</h1>
                                            <p>Your score is: {score} of {Object.keys(questions).length}</p>
                                            <p>Thank you!</p>
                        <div className = "form-group">
                            <button className="btn btn-danger" style={{ color:'white'}} onClick={this.saveResult}>Close</button>
                        </div>
                    </form> 
                            
                            
                        </div>
                      
                    
                         
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
}
export default Quiz