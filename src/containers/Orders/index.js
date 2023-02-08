import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../actions";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../components/UI/Input";
import CheckboxTree from "react-checkbox-tree";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import "./style.css";
import { MdPlayArrow, MdArrowDropDownCircle } from "react-icons/md";

const Orders = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const order = useSelector((state) => state.order);
  useEffect(() => {
    if (!order.loading) {
      dispatch(getAllOrder());
    }
  }, []);
  const renderOrders = () => {
    let list = [];
    if (order.orders.length > 0) {
      for (let ord of order.orders) {
        list.push({
          label: (
            <Row style={{ fontSize: "14px" }}>
              <Col md={2}>{ord.user.fullname}</Col>
              <Col md={2}>{ord.user.email}</Col>
              <Col md={2}>
                Số 27 Ngõ 2 Đường Trần Quang Diệu Tp Vinh Nghệ An
              </Col>
              <Col md={1}>0971824617</Col>
              <Col md={2}>
                {ord.items.map((x, index) => (
                  <p key={index}>
                    {x.productId.name} - {x.purchasedQty} kg
                  </p>
                ))}
              </Col>
              <Col md={1}>{ord.totalAmount} vnđ</Col>
              <Col md={2}>{ord.createdAt.slice(0, 10)}</Col>
            </Row>
          ),
          value: ord._id,
        });
      }
    }
    return list;
  };
  return (
    <Layout sidebar>
      <h3 className="category-title">Quản lý hóa đơn</h3>
      <Row>
        <Col md={8}>
          <p className="action-title">Các chức năng :</p>
          <div className="actionBtnContainer">
            <button className="actions add-action">
              <IoIosTrash /> <span>Thống kê tất cả đơn hàng</span>
            </button>
          </div>
        </Col>
        <Col md={4}>
          <p className="action-title">Tìm kiếm đơn hàng: </p>
          <div className="form-search">
            <Row>
              <Col md={9}>
                <Input
                  placeholder="Nhập tên người đặt hàng"
                  value={search}
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <button className="btn form-control btn-primary">
                  <AiOutlineSearch />
                </button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Container style={{ marginTop: "50px" }}>
        <Row
          style={{
            padding: "20px 0px",
            margin: "0px",
            boxShadow: "-10px 0px 10px rgba(0, 0, 0, 0.6)",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#080a2f",
          }}
        >
          <Col md={2}>Người đặt hàng</Col>
          <Col md={2}>Email</Col>
          <Col md={2}>Địa chỉ</Col>
          <Col md={1}>Số điện thoại</Col>
          <Col md={2}>Sản phẩm</Col>
          <Col md={1}>Tổng tiền</Col>
          <Col md={2}>Ngày đặt hàng</Col>
        </Row>
        <Row>
          <Col>
            <CheckboxTree
              nodes={renderOrders()}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <RiCheckboxCircleFill />,
                uncheck: <RiCheckboxBlankCircleLine />,
                halfCheck: <RiCheckboxBlankCircleLine />,
                expandClose: <MdPlayArrow />,
                expandOpen: <MdArrowDropDownCircle />,
              }}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Orders;
