import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import CheckboxTree from "react-checkbox-tree";
import { MdPlayArrow, MdArrowDropDownCircle } from "react-icons/md";
import { getContacts } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
const Contact = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const cont = useSelector((state) => state.auth.contacts);
  useEffect(() => {
    if (cont.length == 0) {
      dispatch(getContacts());
    }
  }, [cont]);

  const renderContacts = () => {
    if (search != "") {
      let newCont = [];
      newCont = cont.filter((x) => {
        return x.fullname.toLowerCase().includes(search.toLowerCase().trim());
      });
      let list = [];
      for (let x of newCont) {
        list.push({
          label: (
            <Row>
              <Col>{x.fullname}</Col>
              <Col>{x.email}</Col>
              <Col>{x.title}</Col>
              <Col>{x.content}</Col>
            </Row>
          ),
          value: x._id,
        });
      }
      return list;
    } else {
      let list = [];
      if (cont.length > 0) {
        for (let x of cont) {
          list.push({
            label: (
              <Row>
                <Col>{x.fullname}</Col>
                <Col>{x.email}</Col>
                <Col>{x.title}</Col>
                <Col>{x.content}</Col>
              </Row>
            ),
            value: x._id,
          });
          return list;
        }
      }
    }
  };
  return (
    <div>
      <Layout sidebar>
        <h3 className="category-title">Quản lý liên hệ</h3>
        <Row>
          <Col md={8}>
            <p className="action-title">Các chức năng :</p>
            <div className="actionBtnContainer">
              <button onClick={handleShow} className="actions add-action">
                <IoIosAdd /> <span>Thông kê tất cả liên hệ</span>
              </button>
            </div>
          </Col>
          <Col md={4}>
            <p className="action-title">Tìm kiếm người liên hệ: </p>
            <div className="form-search">
              <Row>
                <Col md={12}>
                  <Input
                    placeholder="Nhập tên danh mục"
                    value={search}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                  />
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
            <Col md={3}>Họ tên</Col>
            <Col md={3}>Email</Col>
            <Col md={3}>Tiêu đề</Col>
            <Col md={3}>Nội dung</Col>
          </Row>
          <Row>
            <Col md={12}>
              <CheckboxTree
                nodes={cont.length > 0 ? renderContacts() : []}
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
    </div>
  );
};

export default Contact;
