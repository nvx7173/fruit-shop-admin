import React from "react";
import Layout from "../../components/Layout";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  return (
    <Layout sidebar>
      <div style={{ height: "800px" }}>
        <h3>Chào mừng đến với trang quản lý cửa hàng FreshFruit</h3>
      </div>
    </Layout>
  );
};

export default Home;
