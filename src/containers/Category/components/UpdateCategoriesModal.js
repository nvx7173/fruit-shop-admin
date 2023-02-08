import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    size,
    checkedArray,
    handleCategoryInput,
    categoryList,
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
              margin: "10px 0px",
              padding: "10px 0px",
            }}
          >
            <Col md={6}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Tên danh mục mới:
              </p>
              <Input
                value={item.name}
                placeholder={`Tên danh mục`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col md={6}>
              <p style={{ color: "blueviolet", fontWeight: "bold" }}>
                Chọn danh mục cha mới:
              </p>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateCategoriesModal;
