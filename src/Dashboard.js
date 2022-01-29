import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Select, Spin } from "antd";
import CoronaHitMap from "./CoronaMap";
// import Maps from "./Maps";
import axios from "./Axios";
import {
  FaUsers,
  FaProcedures,
  FaPray,
  FaChild,
  FaSadTear,
} from "react-icons/fa";

const { Meta } = Card;

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [covidData, setCovidData] = useState(null);
  const [countryWiseData, setCountryWiseData] = useState(null);

  useEffect(() => {
    axios
      .get("/countries")
      .then((res) => {
        const cArray = res.data.map((c) => c.country);
        const cData = res.data.find((c) => c.country === "World");
        setCountries(cArray);
        setCovidData(res.data);
        setCountryWiseData(cData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function handleChange(value) {
    const cData = covidData.find((c) => c.country === value);
    setCountryWiseData(cData);
  }

  // console.log(covidData);
  // console.log(countryWiseData);

  return (
    <Layout className="vh-100">
      <div className="container" style={{ margin: "80px auto" }}>
        {loading && (
          <Row>
            <Col lg={10} className="gutter-row">
              <Spin size="large" />
            </Col>
          </Row>
        )}
        {!loading && (
          <Row>
            <Col lg={12} className="gutter-row">
              <h1 className="heading">Covid 19 Tracker</h1>
              <Select
                defaultValue="world"
                style={{ width: "100%", margin: "15px 0" }}
                size="large"
                onChange={handleChange}
              >
                {countries &&
                  countries.map((c) => (
                    <Select.Option value={c} key={c}>
                      {c}
                    </Select.Option>
                  ))}
              </Select>

              <Row gutter={16}>
                {countryWiseData && (
                  <>
                    <Col md={12} span={24}>
                      <Card bordered={false} className="mb-4">
                        <Meta
                          avatar={
                            <div className="icon gradient-1">
                              <FaUsers />
                            </div>
                          }
                          title="Cases"
                          description={countryWiseData.cases}
                        />
                      </Card>
                    </Col>
                    <Col md={12} span={24}>
                      <Card bordered={false} className="mb-4">
                        <Meta
                          avatar={
                            <div className="icon gradient-2">
                              <FaProcedures />
                            </div>
                          }
                          title="Active"
                          description={countryWiseData.active}
                        />
                      </Card>
                    </Col>
                    <Col md={12} span={24}>
                      <Card bordered={false} className="mb-4">
                        <Meta
                          avatar={
                            <div className="icon gradient-4">
                              <FaChild />
                            </div>
                          }
                          title="Recovered"
                          description={countryWiseData.recovered}
                        />
                      </Card>
                    </Col>
                    <Col md={12} span={24}>
                      <Card bordered={false} className="mb-4">
                        <Meta
                          avatar={
                            <div className="icon gradient-6">
                              <FaProcedures />
                            </div>
                          }
                          title="Death"
                          description={countryWiseData.deaths}
                        />
                      </Card>
                    </Col>
                    <Col md={12} span={24}>
                      <Card bordered={false} className="mb-4">
                        <Meta
                          avatar={
                            <div className="icon gradient-5">
                              <FaPray />
                            </div>
                          }
                          title="Critical"
                          description={countryWiseData.critical}
                        />
                      </Card>
                    </Col>
                    <Col md={12} span={24}>
                      <Card bordered={false} className="mb-4">
                        <Meta
                          avatar={
                            <div className="icon gradient-12">
                              <FaSadTear />
                            </div>
                          }
                          title="Death Today"
                          description={countryWiseData.todayDeaths || "0"}
                        />
                      </Card>
                    </Col>
                  </>
                )}
              </Row>
            </Col>

            <Col lg={12} className="gutter-row w-100">
              <Card className="mapsection">
                <div id="mapContainer">
                  <CoronaHitMap covidData={covidData} />
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
