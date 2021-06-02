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
    this.saveTest = this.saveTest.bind(this);   
    this.deleteForm = this.deleteForm.bind(this);
  }

  saveTest = (e) => {
    e.preventDefault();    
        let task = { id:this.state.id,title : this.state.title, count: this.state.count}
        QuizzesServer.addQuestionForm(task).then((res) =>{
            let data = res.data;
            let tasks = this.state.tasks;
           
        })
        this.props.history.push('/addques/'+this.state.id);     
    
}
deleteForm(id){
    console.log(id  + " idid")
    QuizzesServer.deleteForm(id);
 
    this.props.history.push('/mycreatedtests');
}
  // changeTestNameHandler= (event) => {
  //   this.setState({name: event.target.value});
  // }
  changeTestTitleHandler= (event) => {
    this.setState({title: event.target.value});
  }
  changeCountHandler= (event) => {
    this.setState({count: event.target.value});
  }
  cardView(id){
    this.props.history.push(`/addQuestion/${id}`);
  }
  editQuestion(id){
    this.props.history.push(`/editQuestion/${id}`);
  }
  deleteQuestion(id){
    console.log(id  + " idid")
    QuizzesServer.deleteQuestion(id);
 
    this.props.history.push('/addques/'+this.state.id);
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
    return <div >
    
    
        <div class="container">                
          <h3>Question:   {quize.questionText}</h3>
          <h3> Option A:   {quize.optionA}</h3>
          <h3>Option B:  {quize.optionB}</h3>
          <h3> Option C: {quize.optionC}</h3>
          <br/>
          <h3><b> CURRECT ANSWER IS:  {answer[quize.answer-1]}</b></h3>


          <br/> 
         
          <button class="btn btn-success mb-4 mr-4"  onClick={()=>this.editQuestion(quize.id)}>EDIT</button>
          <button class="btn btn-danger mb-4 ml-4"  onClick={()=>this.deleteQuestion(quize.id)}>DELETE</button>  
          <hr/>
          <br/>     
        
         
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
                    <form>
                        
                    <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Task name" name="title"
                    value={this.state.title} onChange={this.changeTestTitleHandler}
                    aria-label="Recipient's username" aria-describedby="button-addon2"/>                
                    
                  </div>
                  <h4> Change count of randomize questions or the number of questions to be asked randomly</h4>
                  <div class="input-group mb-3">
                  <input type="number" class="form-control" placeholder="Count of randomize questions" name="count"
                    value={this.state.count} onChange={this.changeCountHandler}
                    aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    </div>
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" 
                    onClick={this.saveTest}
                    id="button-addon2">Edit</button>
                  </div>
                  <button className="btn btn-danger mt-2"  onClick={()=>this.deleteForm(this.state.id)}>
                                DELETE
                    </button>
                  </form>
                    <hr/>

                    <br/>
                    <button className="btn btn-primary mt-4 mb-4"  onClick={()=>this.cardView(this.state.id)}>
                                + ADD QUESTIONS
                    </button>
                    <h4>All questions</h4>
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
     
     
     
    );
  }
  
}

