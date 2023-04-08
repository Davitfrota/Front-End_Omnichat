import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

import { projectListData } from "../../common/data";

//Import Component
import Breadcrumbs from "/src/components/Common/Breadcrumb";

const ProjectsList = () => {

  //meta title
  document.title = "Project List | Skote - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap align-middle table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "100px" }}>
                          #
                        </th>
                        <th scope="col">Projects</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Team</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectListData.map((item, key) => (
                        <tr key={key}>
                          <td><img src={item.img} alt="" className="avatar-sm" /></td>
                          <td>
                            <h5 className="text-truncate font-size-14"><Link to="" className="text-dark">{item.name}</Link></h5>
                            <p className="text-muted mb-0">{item.description}</p>
                          </td>
                          <td>{item.dueDate}</td>
                          <td><span className={"badge bg-" + item.color}>{item.status}</span></td>
                          <td>
                            <div className="avatar-group">
                              {item.team.map((items, key) => (
                                <React.Fragment key={key}>
                                  <div className="avatar-group-item">
                                    <Link to="" className="d-inline-block">
                                      {items.img ?
                                        <img src={items.img} alt="" className="rounded-circle avatar-xs" />
                                        :
                                        <div className="avatar-xs">
                                          <span className={
                                            "avatar-title rounded-circle bg-" +
                                            items.profileColor +
                                            " text-white" +
                                            " font-size-16"
                                          }>
                                            {items.profile}
                                          </span>
                                        </div>
                                      }
                                    </Link>

                                  </div>

                                </React.Fragment>
                              ))}
                            </div>
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" to="#" className="card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="mdi mdi-dots-horizontal font-size-18"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">Another action</DropdownItem>
                                <DropdownItem href="#">Something else here</DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ProjectsList);
