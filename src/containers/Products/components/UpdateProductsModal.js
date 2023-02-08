import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateProductsModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    size,
    checkedArray,
    handleProductInput,
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
            <Col md={6}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Tên sản phẩm mới:
              </p>
              <Input
                style={{ padding: "20px 10px" }}
                value={item.name}
                placeholder={`Tên sản phẩm`}
                onChange={(e) =>
                  handleProductInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col md={6}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Giá sản phẩm mới:
              </p>
              <Input
                style={{ padding: "20px 10px" }}
                value={item.price}
                placeholder={`Giá sản phẩm`}
                onChange={(e) =>
                  handleProductInput("price", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col md={6}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Số lượng sản phẩm mới:
              </p>
              <Input
                style={{ padding: "20px 10px" }}
                value={item.quantity}
                placeholder={`Số lượng sản phẩm`}
                onChange={(e) =>
                  handleProductInput(
                    "quantity",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              />
            </Col>
            <Col md={6}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Chi tiết sản phẩm mới:
              </p>
              <Input
                style={{ padding: "20px 10px" }}
                value={item.description}
                placeholder={`Chi tiết sản phẩm`}
                onChange={(e) =>
                  handleProductInput(
                    "description",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              />
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateProductsModal;
