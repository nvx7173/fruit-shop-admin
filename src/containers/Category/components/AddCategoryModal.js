import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit,
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
    >
      <Row>
        <Col md={6}>
          <p style={{ color: "blueviolet", fontWeight: "bold" }}>
            Tên danh mục:
          </p>
          <Input
            value={categoryName}
            placeholder={`Nhập tên danh mục`}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col md={6}>
          <p style={{ color: "blueviolet", fontWeight: "bold" }}>
            Danh mục cha:
          </p>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option value="">Không có danh mục cha</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div style={{ padding: "15px 0" }}>
            <p style={{ color: "blueviolet", fontWeight: "bold" }}>
              Ảnh danh mục:
            </p>
            <input
              type="file"
              name="categoryImage"
              onChange={handleCategoryImage}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
