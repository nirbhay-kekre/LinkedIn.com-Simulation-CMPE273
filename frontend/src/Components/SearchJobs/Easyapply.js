import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './Easyapply.css';
import '../NavBar/Navbar.css';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import URI from '../../constants/URI';
import { userConstants } from '../../constants';
import { getapplicantprofile } from '../../Actions/applicant_login_profile_actions';

class Easyapply extends Component{
    constructor(props){
        super(props);
        this.state = {
          profile : [],
          jobdetails :[ {_id : "5bfcfb5ab86ad9459e4b8421",
          posted_by : "5bfcf215fa36bb441e5b2935",
          title : "Title2",
          company : "Company2",
          job_description : "Job Description2",
          industry : "Industry2",
          employment_type : "Internship",
          location : "New York",
          job_function : "Job Function2",
          company_logo : "https://logonoid.com/images/sjsu-logo.png",
          posted_date : "2018-12-01T00:00:00.000Z",
          expiry_date : "2019-02-13T00:00:00.000Z",
          applications : [] }],
          firstname : "",
          lastname : "",
          phonenumber : "",
          email : "",
          profilephoto : "",
          resume : "",
          touchedprofile : {
            firstname: false,
            lastname: false,
            phonenumber : false,
            email : false,
          }
        };
        this.submitApply = this.submitApply.bind(this);
    }


    componentDidMount() {
        //call to action
        const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        this.props.getapplicantprofile(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                this.setState({ 
                        profile: response.payload.data.profile,
                        firstname : response.payload.data.profile.firstName,
                        lastname : response.payload.data.profile.lastName,
                        phonenumber : response.payload.data.profile.phoneNumber === undefined || null || ""  ? "" : response.payload.data.profile.phoneNumber,
                        email : response.payload.data.profile.email,
                        resume : response.payload.data.profile.resume,
                        profilephoto : response.payload.data.profile.profilePicture === "" ? "images/avatar.png" : response.payload.data.profile.profilePicture,
                        isLoading : false
                }); 
                this.refs.myfirstname.value = response.payload.data.profile.firstName      
                this.refs.mylastname.value = response.payload.data.profile.lastName  
                this.refs.myphonenumber.value = response.payload.data.profile.phoneNumber      
                this.refs.myemail.value = response.payload.data.profile.email    
            }
        })
    }

    openResumeDialog = (e) => {
        document.getElementById('resume').click();
    }

    uploadresume = (event) => {
        event.preventDefault();
        var file = event.target.files[0]
        console.log(file)

        this.setState ({
            resume : file.name,
            uploadedresume : file
        })
    }
    
    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }

        this.setState(state);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touchedprofile: { ...this.state.touchedprofile, [field]: true }
        });
    }

    handleValidation () {
        let formIsValid = false;
        const errors = validateprofile(this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.email, this.state.resume);
        if(!errors.firstname && !errors.lastname && !errors.lastname && !errors.phonenumber && !errors.email && !errors.resume){
          formIsValid = true
        }
        return formIsValid;
    }

    submitApply = () => {
        if (this.handleValidation()) {
            const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
            const data = {
                firstName : this.state.firstname,
                lastName : this.state.lastname,
                email : this.state.email,
                phoneNumber : this.state.phonenumber,
                resume : this.state.resume,
            }

            var formData = new FormData();
            formData.append('uploadedFile', this.state.uploadedresume);
            
            Object.keys(data).forEach(function(key){
                formData.append(key, data[key]);
            });

            // Display the formdata key/value pairs
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }

            // this.props.applyjob(formData, token).then(response => {
            //     console.log("response:", response);
            //     if(response.payload.status === 200){
            //         console.log("Applied job Successfully")
            //         window.location.href = '/searchjobs';
            //     }
            //  })
            // }
        }
    } 

    render() {
        const {profile, jobdetails} = this.state;
        const {isLoading} = this.state;
        if(!isLoading){
            const errors = validateprofile(this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.email, this.state.resume);
            var shouldMarkError = (field) => {
                const hasError = errors[field];
                const shouldShow = this.state.touchedprofile[field];
                return hasError ? shouldShow : false;
            };
        }
        return (
           <div className="jobsearch-wrapper">
                <div className="navbar fixed-top navbar-dark bg-dark" style={{ height: "52px" }}>
                    <div className="home_wrapper">
                        <div className="nav-main__content full-height display-flex align-items-center" role="navigation">
                            <h1 className ="easy-apply-h1"><a className="navbar-brand" href="/"><img src={"/images/linkedin-logo2.png"} alt="" />&nbsp;Easy Apply</a></h1>
                        </div> 
                    </div>
                </div>
                <div id ="container-easyapply">
                    <div className ="wrapping-header" >
                        <div className ="easyapply-header">
                            <div className ="company-logo">
                                <img src ={jobdetails[0].company_logo} alt="" style = {{width:"70px", height: "70px"}} />
                            </div>
                            <div className ="company-info-wrapper">
                                <div className ="company-info">
                                    <div className = "job-title">{jobdetails[0].title}
                                    </div>
                                    <div className = "company-name">{jobdetails[0].company}
                                    </div>
                                    <div className = "location-description">{jobdetails[0].location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "artdeco-scrolling-container">
                    <div className = "artdeco-tabpanel">
                        <section className = "section-profile ember-view">
                            <div className = "profile-title">LinkedIn profile</div>
                            <div className = "profile-entity">
                            <figure>
                                {this.state.profilephoto === "/images/avatar.png" ?
                                <img alt="" src = "/images/avatar.png" /> : 
                                <img src = {URI.ROOT_URL + "/profilepictures/" + this.state.profilephoto} alt="" />}
                            </figure>
                            <dl>
                                <dt className = "profile-name">{profile.firstName}&nbsp;{profile.lastName} </dt>
                                <dd className = "profile-headline">{profile.profileSummary}</dd>
                            </dl>
                            </div>
                        </section>
                        <section className = "section-profile ember-view" style = {{marginTop : "30px"}}>
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Contact Info</div>
                            <li className = "job-question ember-view">
                                <div className="row form-group">
                                    <div className = "col-xs-6 col-md-6">
                                        <label htmlFor="position-firstname-typeahead" className="mb1 required">First Name*</label>
                                        <input className = "form-control" name = "firstname" ref = "myfirstname" onChange = {this.changeHandler} onBlur={this.handleBlur('firstname')} id="position-firstname-typeahead" maxLength="100" type="text"/>
                                    </div>
                                    <div className = "col-xs-6 col-md-6">
                                        <label htmlFor="position-lastname-typeahead" className="mb1 required">Last Name*</label>
                                        <input className = "form-control"  name = "lastname" ref = "mylastname" onChange = {this.changeHandler} onBlur={this.handleBlur('lastname')} id="position-lastname-typeahead" maxLength="100" type="text"/>
                                    </div>
                                    {!isLoading ?
                                        <div className = "col-xs-6 col-md-6">
                                        {shouldMarkError('firstname') ? <div className=""  style = {{color: "red"}}>First Name is a required field</div> : (null)}
                                        </div> : (null)
                                    }
                                    {!isLoading ?
                                        <div className = "col-xs-6 col-md-6">
                                        {shouldMarkError('lastname') ? <div className=""  style = {{color: "red"}}>Last Name is a required field</div> : (null)}
                                        </div> : (null)
                                    }
                                </div>
                                    <label htmlFor = "phone-number-question" className = "question-apply">Phone Number*</label>
                                    <input className = "form-control" name = "phonenumber" id="phone-number-question" ref ="myphonenumber" onChange = {this.changeHandler} type="text" pattern="[0-9]{10}" onBlur={this.handleBlur('phonenumber')} placeholder="1234567890"/>
                                    {!isLoading ?
                                    <div className = "col-xs-12">
                                     {shouldMarkError('phonenumber') ? <div className=""  style = {{color: "red"}}>Phone Number is a required field</div> : (null)}
                                    </div> : (null) }
                                    <label htmlFor = "email-question" className = "question-apply">Email Address*</label>
                                    <input className = "form-control" name = "email" id="email-question" ref = "myemail" onChange = {this.changeHandler} maxLength="100" type="email" onBlur={this.handleBlur('email')} type="email"/>
                                    {!isLoading ?
                                    <div className = "col-xs-12">
                                    {shouldMarkError('email') ? <div className=""  style = {{color: "red"}}>Email is a required field</div> : (null)}
                                    </div> : (null) }
                            </li>
                        </section>
                        <section className = "section-profile ember-view">
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Resume</div>
                            <div className="form-group">
                                <input type="file" id="resume" onChange={this.uploadresume} style = {{display : "none"}}/>
                                <button type="file" className="btn arteco-btn-save" id="position-resume-typeahead" onClick = {this.openResumeDialog} style = {{width : "150px"}}>Upload Resume
                                </button>&nbsp;&nbsp;{this.state.resume} 
                            </div> 
                        <div className = "job-application-consents ember-view">We include a copy of your full profile with your application
                        <br></br>
                        We’ll save your answers to questions that tend to be common across applications so you can use them later. 
                        </div>
                        </section>
                        <button className = "btn arteco-btn" type = "submit"  style = {{marginBottom : "100px"}} onClick = {this.submitApply}>Submit</button>
                    </div>    
                </div>
        </div>
        )
    }
}

function validateprofile(firstname, lastname, phonenumber, email, resume) {
    // true means invalid, so our conditions got reversed
    return {
      firstname: firstname.length === 0, 
      lastname: lastname.length === 0,
      phonenumber: phonenumber.length === 0,
      email: email.length === 0,
      resume: resume.length === 0,
    };
}

function mapStateToProps(state) {
    return {
        getapplicantprofile: state.getapplicantprofile
    }
}

export default withRouter(reduxForm({
    form: "Easy_Apply"
    })(connect(mapStateToProps, { getapplicantprofile}) (Easyapply)));