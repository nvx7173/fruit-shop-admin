import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateUsersModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    size,
    checkedArray,
    handleUserInput,
    userList,
    onSubmit,
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
      size={size}
    >
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row
            key={index}
            style={{
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              margin: "10px",
              padding: "10px",
            }}
          >
            <Col md={12}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Nhập họ tên:
              </p>
              <Input
                value={item.fullname}
                placeholder={`Họ tên`}
                onChange={(e) =>
                  handleUserInput("fullname", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col md={12}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>Email</p>
              <Input
                value={item.email}
                placeholder={`Giá sản phẩm`}
                onChange={(e) =>
                  handleUserInput("email", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col md={12}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>Quyền</p>
              <select
                className="form-control"
                value={item.role}
                onChange={(e) =>
                  handleUserInput("role", e.target.value, index, "checked")
                }
              >
                <option>Quyền</option>

                <option key="1" value="manager">
                  Manager
                </option>
                <option key="2" value="user">
                  User
                </option>
              </select>
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateUsersModal;
