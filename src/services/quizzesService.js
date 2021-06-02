import axios from 'axios';
import authHeader from './auth-header';
const ALL_QUIZZES_API = 'http://localhost:8000/api/allQuizzes'
const ALL_PASSED_API = 'http://localhost:8000/api/allPassedTests'
const ALL_CREATED_API = 'http://localhost:8000/api/allCreatedTests'
const GET_TEST_API = 'http://localhost:8000/api/getTest/'
const GET_QUESTION_API = 'http://localhost:8000/api/getQuestion/'
const GET_QUESTIONS_API = 'http://localhost:8000/api/getQuestions/'
const GET_QUESTIONS_ALL_API = 'http://localhost:8000/api/getQuestionsAll/'
const GET_RESULTS_ALL_API = 'http://localhost:8000/api/getResultByForm/'

const ADD_RESULT_API = 'http://localhost:8000/api/addResult'
const ADD_QUESTIONFORM_API = 'http://localhost:8000/api/addQuestionForm'
const ADD_QUESTION_API = 'http://localhost:8000/api/addQuestion'
const EDIT_QUESTION_API = 'http://localhost:8000/api/editQuestion'
const DELETE_FORM_API ='http://localhost:8000/api/deleteForm/'
const DELETE_QUESTION_API ='http://localhost:8000/api/deleteQuestion/'

class QuizzesService{
    getAllQuizzes(){
        return axios.get(ALL_QUIZZES_API, {headers:authHeader()});
    }

    getQuestionAll(test_id){
        return axios.get(GET_QUESTIONS_ALL_API + test_id,{ headers: authHeader() });
    }
    getAllPassedTests(){
        return axios.get(ALL_PASSED_API, {headers:authHeader()});
    }
    getAllCreatedTests(){
        return axios.get(ALL_CREATED_API, {headers:authHeader()});
    }
    getResultTests(test_id){
        return axios.get(GET_RESULTS_ALL_API+test_id, {headers:authHeader()});
    }
    getOneTest(id){
        return axios.get(GET_TEST_API + id, { headers: authHeader() });
    }
    geOneQuestion(id){
        return axios.get(GET_QUESTION_API + id, { headers: authHeader() });
    }

    getQuestions(test_id){
        return axios.get(GET_QUESTIONS_API + test_id,{ headers: authHeader() });
    }
    addQuestionForm(task){
        return axios.post(ADD_QUESTIONFORM_API, task,{ headers: authHeader() });
    }
    addQuestion(task){
        return axios.post(ADD_QUESTION_API, task,{ headers: authHeader() });
    }
    editQuestion(task){
        return axios.post(EDIT_QUESTION_API, task,{ headers: authHeader() });
    }
    addResult(task){
        return axios.post(ADD_RESULT_API, task,{ headers: authHeader() });
    }
    deleteForm(id){
        return axios.delete(DELETE_FORM_API + id,{ headers: authHeader() })
    }
    deleteQuestion(id){
        return axios.delete(DELETE_QUESTION_API + id,{ headers: authHeader() })
    }
}

export default new QuizzesService();