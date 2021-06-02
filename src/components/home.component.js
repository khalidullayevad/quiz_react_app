import React, { Component } from "react";

import workinggirl from '../images/working-girl.png'
import office from '../images/office.png'
import femaleavatar from '../images/female-avatar.png'


export default class Home extends Component {

  
  render() {
       
    return ( <div style ={{background:'white'}}>
               <div class="hero hero-bg d-flex justify-content-center align-items-center">
               <div class="container">
                    <div class="row">

                        <div class="col-lg-6 col-md-10 col-12 d-flex flex-column justify-content-center align-items-center">
                              <div class="hero-text">

                                   <h1 class="text-white" data-aos="fade-up">Generate Random Tests and Quizzes</h1>

                                   <a href="/register" class="custom-btn btn-bg btn mt-3" data-aos="fade-up" data-aos-delay="100">Sign Up</a>

                                  
                              </div>
                        </div>
                        <div class="col-lg-6 col-12">
                          <div class="hero-image" data-aos="fade-up" data-aos-delay="300">

                            <img src={workinggirl} class="img-fluid" alt="working girl"/>
                          </div>
                        </div>

                    </div>
               </div>
               </div>


             <div class="about section-padding pb-0 mt-4"  id="about">
                    <div class="container">
                        <div class="row">
                                <div class="col-lg-7 mx-auto col-md-10 col-12">
                                    <div class="about-info">
                                        <h2 class="mb-4" data-aos="fade-up">the best website <strong>Quizzes</strong> in Rio de Janeiro</h2>

                                        <p class="mb-0" data-aos="fade-up">Total 5 HTML pages are included in this template from TemplateMo website. Please check 2 <a href="blog.html">blog</a> pages, <a href="project-detail.html">project</a> page, and <a href="contact.html">contact</a> page. 
                                        <br/><br/>You are <strong>allowed</strong> to use this template for commercial or non-commercial purpose. You are NOT allowed to redistribute the template ZIP file on template collection websites.</p>
                                    </div>
                                    <div class="about-image" data-aos="fade-up" data-aos-delay="200">
                                    <img src={office} class="img-fluid" alt="office"/>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div> 
           



            <div class="testimonial section-padding">
          <div class="container">
               <div class="row">

                    <div class="col-lg-6 col-md-5 col-12">
                        <div class="contact-image" data-aos="fade-up">

                          <img src={femaleavatar} class="img-fluid" alt="website"/>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-7 col-12">
                      <h4 class="my-5 pt-3" data-aos="fade-up" data-aos-delay="100">Client Testimonials</h4>

                      <div class="quote" data-aos="fade-up" data-aos-delay="200"></div>

                      <h2 class="mb-4" data-aos="fade-up" data-aos-delay="300">Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua incididunt mollit id et sit proident dolor nulla sed commodo.</h2>

                      <p data-aos="fade-up" data-aos-delay="400">
                        <strong>Mary Zoe</strong>

                        <span class="mx-1">/</span>

                        <small>Digital Agency (CEO)</small>
                      </p>
                    </div>

               </div>
              
          </div>
     </div>


  </div>
    )
    
}
}
