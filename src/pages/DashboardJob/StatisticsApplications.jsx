import React from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { StatisticsApplicationsChart } from './JobCharts';

const StatisticsApplications = () => {
    return (
        <React.Fragment>
            <Col lg={8}>
                <Card>
                    <CardBody>
                        <div className="d-sm-flex flex-wrap">
                            <h4 className="card-title mb-4">Statistics Applications</h4>
                            <div className="ms-auto">
                                <Nav pills>
                                    <NavItem>
                                        <NavLink href="#">Week</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Month</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="active" href="#">Year</NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                        <StatisticsApplicationsChart dataColors='["--bs-primary", "--bs-success", "--bs-warning", "--bs-info"]'  dir="ltr" />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default StatisticsApplications;