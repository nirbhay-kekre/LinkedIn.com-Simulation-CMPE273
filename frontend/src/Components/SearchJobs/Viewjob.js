import React, { Component } from 'react';
import '../../App.css';
import Navbar from '../NavBar/Navbar';
import '../../profile_wrapper.css';
import { Field, reduxForm } from "redux-form";
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Viewjob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                {
                    id: 1,
                    posted_by: "CISCO",
                    title: "Security and Incident Manager",
                    job_description: "Upwork1 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits.Are you a superstar security defender? Would you like to work with advanced tools and lead a team? We can use your skills and experience to defend against sophisticated attacks and keep our platform secure. We need your disciplined, methodical approach towards incident response and security investigations. \n\n Upwork1 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits.Are you a superstar security defender? Would you like to work with advanced tools and lead a team? We can use your skills and experience to defend against sophisticated attacks and keep our platform secure. We need your disciplined, methodical approach towards incident response and security investigations",
                    industry: "industry",
                    employment_type: "fulltime",
                    location: "Sanjose",
                    job_function: "adadawdfw",
                    company_logo: "/images/cisco.png",
                    posted_date: "ssdsd",
                    expiry_date: "sdfcsdf"
                }]
        };
    }


    componentDidMount() {
        //call to action
    }


    render() {
        var jobs = this.state.jobs;
        return (
            <div className="jobsearch-wrapper">
                <Navbar></Navbar>
                <div className="Elevation-2dp profile-background-image profile-background-image--loading ember-view"></div>
                <div className="pv-content1 profile-view-grid neptune-grid2 two-column">
                    <div className="core-rail">
                        <div className="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                            <div className="mt4 display-flex ember-view">
                                <div className="pv-entity__actions"></div>
                                <div className="media">
                                    <a className="pull-left"><img src={jobs[0].company_logo} style={{ height: "150px", width: "150px" }} /></a>
                                    <div className="artdeco-entity-lockup--size-4 gap1">
                                        <div className="job-details__subject" >
                                            {jobs[0].title}
                                        </div>
                                        <div className="job-details__name">{jobs[0].posted_by}</div>
                                        <div className="job-details__location">
                                            <FontAwesomeIcon className="fa-map-marker-alt" icon="map-marker-alt">
                                            </FontAwesomeIcon>&nbsp;&nbsp;{jobs[0].location}</div>
                                        <div className="job-details__posted">Posted on {jobs[0].posted_date}</div>
                                        <button type="submit" className="btn arteco-btn-save">Save</button>
                                        <button type="submit" className="btn arteco-btn" style={{ marginLeft: "10px" }}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pv-profile-section artdeco-container-card ember-view gap">
                            <header className="pv-profile-section__card-header">
                                <h2 className=" t-20 t-black t-bold ">Job Description</h2>
                            </header>
                            <div className="pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                                <li className="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view">
                                    <div className="pv-entity__actions"></div>
                                    <div className="ember-view">
                                        <p className="pv-entity__description t-14 t-black t-normal ember-view">{jobs[0].job_description}</p>
                                    </div>
                                    <div className="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                        <h5 className="pv-profile-section__card-heading t-black t-normal">Job Functions</h5>
                                        <h5 className="t-black t-normal" style={{ fontSize: "1rem" }}>{jobs[0].job_function}</h5>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Viewjob;