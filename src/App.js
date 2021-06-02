import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter  } from "react-router-dom";
import AOS from 'aos';


import './css/bootstrap.min.css'
import './css/font-awesome.min.css'

import './css/owl.carousel.min.css'
import './css/owl.theme.default.min.css'
import './css/aos.css'

// main css for home page
import'./css/templatemo-digital-trend.css'

// import service
import AuthService from "./services/auth.service";



// components
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AllTests from './components/alltests.component'
import Quiz from './components/QuizMain'
import MyPassedTests from './components/myPassedTests.component'
import MyCreatedTests from './components/myCreatedTests'
import AddQuestionForm from './components/addTests.component'
import EditQuestion from './components/addQuestions.component'
import ADDQUES from './components/questionadd'
import EDITQUES from './components/questionedit'
import MyTestResult from './components/resultsByMyTest.component'
import Users from './components/users.manage.component'
import ManageTest from './components/alltests.manage.component'
import FlashCard from './components/flashCardSend'




class App extends Component {
  constructor(props) {
    super(props);
   AOS.init();
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  
  componentWillReceiveProps (){ 
    AOS.refresh(); 
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

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <BrowserRouter >
      <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container">
          <a href="/home" class="navbar-brand" >
            <i class="fa fa-line-chart"></i>
               Random Tests 
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/home"}  className="nav-link smoothScroll">
                Home
              </Link>
            </li>
           
          

          {currentUser ? (
            <div>
            <ul class="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to={"/alltests"} className="nav-link smoothScroll">
                  Test
                </Link>
              </li>
           
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link smoothScroll">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link smoothScroll" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
              </ul>
              </div>
              
           
          ) : (
            <div>
              <li className="nav-item">
                <Link to={"/login"}className="nav-link smoothScroll">
                  Login
                </Link>
              </li>

              
            </div>
          )}
          </ul>
          </div>
          </div>
          </nav>
          <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/quiz/:id" component ={Quiz}></Route> 
            <Route path="/myTestResult/:id" component ={MyTestResult}></Route> 
            <Route path="/addQuestion/:id" component ={ADDQUES}></Route> 
            <Route path="/editQuestion/:id" component ={EDITQUES}></Route> 
            <Route path="/addques/:id" component ={EditQuestion}></Route>   
            <Route path="/flashCard/:id" component ={FlashCard}></Route> 
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} /> 
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/users" component={Users} />
            <Route path="/alltests" component={AllTests} /> 
            <Route path="/allmanage" component={ManageTest} /> 
            <Route path ="/allmypassedtests" component ={MyPassedTests}></Route>
            <Route path='/mycreatedtests' component={MyCreatedTests}></Route> 
            <Route path='/addquestionform' component={AddQuestionForm}></Route>    
           
                   
            
           
                   
          </Switch>
          </div>




          <footer class="site-footer">
      <div class="container">
        <div class="row">

          <div class="col-lg-5 mx-lg-auto col-md-8 col-10">
            <h1 class="text-white" data-aos="fade-up" data-aos-delay="100">We make creative <strong>brands</strong> only.</h1>
          </div>

          <div class="col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-delay="200">
            <h4 class="my-4">Contact Info</h4>

            <p class="mb-1">
              <i class="fa fa-phone mr-2 footer-icon"></i> 
              +99 080 070 4224
            </p>

            <p>
              <a href="#">
                <i class="fa fa-envelope mr-2 footer-icon"></i>
                hello@company.com
              </a>
            </p>
          </div>

          <div class="col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-delay="300">
            <h4 class="my-4">Our Studio</h4>

            <p class="mb-1">
              <i class="fa fa-home mr-2 footer-icon"></i> 
              Av. Lúcio Costa - Barra da Tijuca, Rio de Janeiro - RJ, Brazil
            </p>
          </div>

          <div class="col-lg-4 mx-lg-auto text-center col-md-8 col-12" data-aos="fade-up" data-aos-delay="400">
            <p class="copyright-text">Copyright &copy; 2020 Your Company
            <br/>
            <a rel="nofollow noopener" href="https://templatemo.com">Design: TemplateMo</a></p>
          </div>

          <div class="col-lg-4 mx-lg-auto col-md-6 col-12" data-aos="fade-up" data-aos-delay="500">
            
            <ul class="footer-link">
              <li><a href="#">Stories</a></li>
              <li><a href="#">Work with us</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 mx-lg-auto col-md-6 col-12" data-aos="fade-up" data-aos-delay="600">
            <ul class="social-icon">
              <li><a href="#" class="fa fa-instagram"></a></li>
              <li><a href="#" class="fa fa-twitter"></a></li>
              <li><a href="#" class="fa fa-dribbble"></a></li>
              <li><a href="#" class="fa fa-behance"></a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>

    </div>
    </BrowserRouter >
    );
  }
}

export default App;