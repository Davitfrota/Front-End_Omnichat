import React, { useEffect, useState} from "react";
import { Container,
  Row,
  Col,
  Card,
  CardBody,
   } from "reactstrap";

import { Link } from "react-router-dom";

import classNames from "classnames";

import { useSelector, useDispatch } from "react-redux";
import { getChartsData as onGetChartsData } from "../../store/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import StackedColumnChart from "./StackedColumnChart";

//Import Components
import CardUser from "./card-user";
import MiniWidget from "./mini-widget";
import Earning from "./earning";
import SalesAnalytics from "./sales-analytics";
import TotalSellingProduct from "./total-selling-product";
import SocialSource from "./SocialSource";


const DashboardSaas = (props) => {
  const reports = [
    {
      icon: "bx bx-copy-alt",
      title: "Orders",
      value: "1,452",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Revenue",
      value: "$ 28,452",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-purchase-tag-alt",
      title: "Average Price",
      value: "$ 16.2",
      badgeValue: "0%",
      color: "warning",
      desc: "From previous period",
    },
  ];
  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);


  //meta title
  document.title =
    "Dashboard | Omnichat";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Breadcrumbs title="Dashboards" breadcrumbItem="Omnichat" />

          <CardUser />

          <Row className="align-center">
            <Col xl="8"  >
              <Row >
                <MiniWidget reports={reports} />
              </Row>
            </Col>
            <TotalSellingProduct />
          </Row>

          <Row>

            <Earning dataColors='["--bs-primary"]' />


            <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' />
          </Row>
          <Row>
            <Col xl="8">
              
              <Card>
                  <CardBody>
                    <div className="d-sm-flex flex-wrap">
                      <h4 className="card-title mb-4">Email Sent</h4>
                      <div className="ms-auto">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { active: periodType === "weekly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                onChangeChartPeriod("weekly");
                              }}
                              id="one_month"
                            >
                              Week
                            </Link>{" "}
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { active: periodType === "monthly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                onChangeChartPeriod("monthly");
                              }}
                              id="one_month"
                            >
                              Month
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { active: periodType === "yearly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                onChangeChartPeriod("yearly");
                              }}
                              id="one_month"
                            >
                              Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="clearfix"></div> */}
                    <StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]'/>
                  </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <SocialSource />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardSaas;
