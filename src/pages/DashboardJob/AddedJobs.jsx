import React from 'react';

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//import images
import wechat from "../../assets/images/companies/wechat.svg";
import sass from "../../assets/images/companies/sass.svg";
import adobe from "../../assets/images/companies/adobe.svg";
import airbnb from "../../assets/images/companies/airbnb.svg";
import flutter from "../../assets/images/companies/flutter.svg";
import mailchimp from "../../assets/images/companies/mailchimp.svg";
import spotify from "../../assets/images/companies/spotify.svg";
import reddit from "../../assets/images/companies/reddit.svg";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const AddedJobs = () => {
    return (
        <React.Fragment>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Recent Added Jobs</h4>
                        <SimpleBar style={{ maxHeight: "376px" }}>
                            <div className="vstack gap-4">
                                <div className="d-flex">
                                    <img src={wechat} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">Marketing Director</a></h6>
                                        <p className="text-muted mb-0">Themesbrand, USA - <b>53</b> sec ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>

                                <div className="d-flex">
                                    <img src={sass} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">Frontend Developer</a></h6>
                                        <p className="text-muted mb-0">Themesbrand, Hong-Kong - <b>47</b> min ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>

                                <div className="d-flex">
                                    <img src={adobe} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">React Developer</a></h6>
                                        <p className="text-muted mb-0">Creative Agency, Danemark - <b>1</b> hrs ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="d-flex">
                                    <img src={airbnb} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">NodeJs Developer</a></h6>
                                        <p className="text-muted mb-0">Skote Themes, Louisiana - <b>2</b> hrs ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="d-flex">
                                    <img src={flutter} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">Digital Marketing</a></h6>
                                        <p className="text-muted mb-0">Web Technology pvt.Ltd, Danemark - <b>8</b> hrs ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="d-flex">
                                    <img src={mailchimp} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">Marketing Director</a></h6>
                                        <p className="text-muted mb-0">Skote Technology, Dominica - <b>1</b> days ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="d-flex">
                                    <img src={spotify} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">Business Associate</a></h6>
                                        <p className="text-muted mb-0">Themesbrand, Russia - <b>2</b> days ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="d-flex">
                                    <img src={reddit} alt="" height="40" className="rounded" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="mb-1 font-size-15"><a href="job-details.html" className="text-body">Backend Developer</a></h6>
                                        <p className="text-muted mb-0">Adobe Agency, Malaysia - <b>3</b> days ago</p>
                                    </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="btn btn-light" type="button" id="dropdownMenuButton1">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <DropdownItem href="job-details">View Details</DropdownItem>
                                            <DropdownItem href="#">Apply Now</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddedJobs;