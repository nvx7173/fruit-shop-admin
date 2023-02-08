import React from "react";
import Header from "../Header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  GiKiwiFruit,
  GiBananaPeeled,
  GiCherry,
  GiCorn,
  GiHouse,
  GiPeach,
} from "react-icons/gi";
import "./style.css";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={`/`}>
                    <GiHouse />
                    <span className="manager-title">Dashboard</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to={`/category`}>
                    <GiBananaPeeled />
                    <span className="manager-title">Danh mục</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/products`}>
                    <GiKiwiFruit />
                    <span className="manager-title">Sản phẩm</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/users`}>
                    <GiCherry />
                    <span className="manager-title">Người dùng</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/orders`}>
                    <GiCorn />
                    <span className="manager-title">Hóa đơn</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/contact`}>
                    <GiCherry />
                    <span className="manager-title">Liên hệ</span>
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col className="manager-bar" md={10}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
