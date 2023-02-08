import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import { IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdPlayArrow, MdArrowDropDownCircle } from "react-icons/md";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const notifyAdd = () => toast("Thêm danh mục thành công!");
  const notifyUpdate = () => toast("Cập nhật danh mục thành công!");
  const notifyDelete = () => toast("Xóa danh mục thành công!");
  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const addCategoryForm = () => {
    const form = new FormData();
    if (categoryName === "") {
      alert("Mời nhập tên danh mục");
      return;
    }

    if (categoryImage === "") {
      alert("Mời chọn ảnh danh mục");
      return;
    }
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    form.append("type", "store");
    dispatch(addCategory(form)).then(() => {
      notifyAdd();
      setCategoryName("");
      setParentCategoryId("");
    });
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    if (search != "") {
      let newCate = [];
      newCate = categories.filter((x) => {
        return x.name.toLowerCase().includes(search.toLowerCase().trim());
      });
      let myCategories = [];
      for (let category of newCate) {
        myCategories.push({
          label: (
            <Row>
              <Col md={8} style={{ display: "flex", alignItems: "center" }}>
                {category.name}
              </Col>
              <Col md={4}>
                <div className="img-cat">
                  <img src={category.img} />
                </div>
              </Col>
            </Row>
          ),
          value: category._id,
          children:
            category.children.length > 0 &&
            renderCategories(category.children, search),
        });
      }
      return myCategories;
    } else {
      let myCategories = [];
      for (let category of categories) {
        myCategories.push({
          label: (
            <Row>
              <Col md={8} style={{ display: "flex", alignItems: "center" }}>
                {category.name}
              </Col>
              <Col md={4}>
                <div className="img-cat">
                  <img src={category.img} />
                </div>
              </Col>
            </Row>
          ),
          value: category._id,
          children:
            category.children.length > 0 &&
            renderCategories(category.children, search),
        });
      }
      return myCategories;
    }
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      if (item.name == "") {
        alert("Mời nhập tên danh mục!");

        return;
      }
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      if (item.name == "") {
        alert("Mời nhập tên danh mục!");

        return;
      }
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
    notifyUpdate();
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then(() => {
        dispatch(getAllCategory());
        setDeleteCategoryModal(false);
        notifyDelete();
      });
    }
  };

  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle="Chắc chắn xóa danh mục này ?"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "Không",
            color: "primary",
            onClick: () => {
              setDeleteCategoryModal(false);
            },
          },
          {
            label: "Có",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        {checkedArray.map((item, index) => (
          <ul>
            <li>
              <h4 key={index}>{item.name}</h4>
            </li>
          </ul>
        ))}
      </Modal>
    );
  };

  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <ToastContainer autoClose={2500} />
      <h3 className="category-title">Quản lý danh mục</h3>
      <Row>
        <Col md={8}>
          <p className="action-title">Các chức năng :</p>
          <div className="actionBtnContainer">
            <button onClick={handleShow} className="actions add-action">
              <IoIosAdd /> <span>Thêm danh dục</span>
            </button>
            <button onClick={updateCategory} className="actions edit-action">
              <IoIosCloudUpload /> <span>Cập nhật danh mục</span>
            </button>
            <button onClick={deleteCategory} className="actions delete-action">
              <IoIosTrash /> <span>Xóa danh mục</span>
            </button>
          </div>
        </Col>
        <Col md={4}>
          <p className="action-title">Tìm kiếm danh mục: </p>
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
          <Col md={8}>Tên danh mục</Col>
          <Col md={4}>
            <div className="img-cat">Ảnh danh mục</div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
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
      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={addCategoryForm}
        modalTitle={"Thêm mới danh mục"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle={"Sửa danh mục"}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
