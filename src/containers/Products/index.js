import React, { useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { MdPlayArrow, MdArrowDropDownCircle } from "react-icons/md";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import { AiOutlineSearch } from "react-icons/ai";
import {
  getInitialData,
  addProduct,
  updateProducts,
  deleteProducts as deleteProductsAction,
} from "../../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import CheckboxTree from "react-checkbox-tree";
import { IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import UpdateProductsModal from "./components/UpdateProductsModal";

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [search, setSearch] = useState("");
  const notifyAdd = () => toast("Thêm sản phẩm thành công!");
  const notifyUpdate = () => toast("Cập nhật sản phẩm thành công!");
  const notifyDelete = () => toast("Xóa sản phẩm thành công!");

  const dispatch = useDispatch();
  const addProductsForm = () => {
    if (name === "") {
      alert("Mời nhập tên sản phẩm!");
      return;
    }
    if (quantity === "") {
      alert("Mời nhập tên số lượng!");
      return;
    }
    if (price === "") {
      alert("Mời nhập giá sản phẩm!");
      return;
    }
    if (categoryId === "") {
      alert("Mời chọn danh mục sản phẩm! ");
      return;
    }
    if (productPictures.length == 0) {
      alert("Mời chọn ảnh sản phẩm! ");
      return;
    }
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() => {
      dispatch(getInitialData());
      setShow(false);
      notifyAdd();
    });
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    if (search != "") {
      let newPro = [];
      newPro = product.products.filter((x) => {
        return x.name.toLowerCase().includes(search.toLowerCase().trim());
      });
      let list = [];
      if (newPro.length > 0) {
        for (let pro of newPro) {
          list.push({
            label: (
              <Row>
                <Col md={2}>{pro.name}</Col>
                <Col md={2}>{pro.category.name}</Col>
                <Col md={2}>{pro.price}</Col>
                <Col md={2}>{pro.quantity}</Col>
                <Col md={2}>{pro.description}</Col>
                <Col md={2}>
                  <div className="img-pro">
                    <img src={pro.productPictures[0].img} />
                  </div>
                </Col>
              </Row>
            ),
            value: pro._id,
          });
        }
      }
      return list;
    } else {
      let list = [];
      if (product.products.length > 0) {
        for (let pro of product.products) {
          list.push({
            label: (
              <Row>
                <Col md={2}>{pro.name}</Col>
                <Col md={2}>{pro.category.name}</Col>
                <Col md={2}>{pro.price}</Col>
                <Col md={2}>{pro.quantity}</Col>
                <Col md={2}>{pro.description}</Col>
                <Col md={2}>
                  <div className="img-pro">
                    <img src={pro.productPictures[0].img} />
                  </div>
                </Col>
              </Row>
            ),
            value: pro._id,
          });
        }
      }
      return list;
    }
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        size="lg"
        show={show}
        handleClose={() => setShow(false)}
        modalTitle={"Thêm sản phẩm mới"}
        onSubmit={addProductsForm}
      >
        <Row>
          <Col md={6}>
            <Input
              label="Tên sản phẩm"
              value={name}
              placeholder={`Nhập tên sản phẩm`}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Input
              label="Số lượng"
              value={quantity}
              placeholder={`Nhập số lượng`}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              label="Giá sản phẩm"
              value={price}
              placeholder={`Nhập giá sản phẩm`}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Input
              label="Mô tả sản phẩm"
              value={description}
              placeholder={`Nhập chi tiết sản phẩm...`}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="form-label">Chọn danh mục sản phẩm</p>
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Không có danh mục nào</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </Col>
          <Col md={6}>
            <br></br>
            <p className="form-label">Thêm ảnh sản phẩm</p>
            <input
              type="file"
              name="productPicture"
              onChange={handleProductPictures}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {productPictures.length > 0
              ? productPictures.map((pic, index) => (
                  <div key={index}>{pic.name}</div>
                ))
              : null}
          </Col>
        </Row>
      </Modal>
    );
  };

  const createProductList = (products, options = []) => {
    for (let product of products) {
      options.push({
        value: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
      });
    }
    return options;
  };
  const updateCheckedAndExpandedProducts = () => {
    const products = createProductList(product.products);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((productId, index) => {
        const product = products.find(
          (product, _index) => productId == product.value
        );
        product && checkedArray.push(product);
      });
    setCheckedArray(checkedArray);
  };
  const deleteProduct = () => {
    updateCheckedAndExpandedProducts();
    setDeleteProductModal(true);
  };
  const deleteProducts = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (checkedIdsArray.length > 0) {
      dispatch(deleteProductsAction(checkedIdsArray)).then(() => {
        dispatch(getInitialData());
        setDeleteProductModal(false);
        notifyDelete();
      });
    }
  };
  const renderDeleteProductModal = () => {
    return (
      <Modal
        modalTitle="Chắc chắn xóa sản phẩm này ?"
        show={deleteProductModal}
        handleClose={() => setDeleteProductModal(false)}
        buttons={[
          {
            label: "Không",
            color: "primary",
            onClick: () => {
              return;
            },
          },
          {
            label: "Có",
            color: "danger",
            onClick: deleteProducts,
          },
        ]}
      >
        {checkedArray.map((item, index) => (
          <ul>
            <li>
              <span key={index}>{item.name}</span>
            </li>
          </ul>
        ))}
      </Modal>
    );
  };
  const updateProduct = () => {
    updateCheckedAndExpandedProducts();
    setUpdateProductModal(true);
  };
  const updateProductsForm = () => {
    const form = new FormData();
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("price", item.price);
      form.append("quantity", item.quantity);
      form.append("description", item.description);
    });
    dispatch(updateProducts(form)).then(() => {
      dispatch(getInitialData());
      setUpdateProductModal(false);
      notifyUpdate();
    });
  };

  const handleProductInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    }
  };

  const productList = createProductList(product.products);
  return (
    <Layout sidebar>
      <ToastContainer autoClose={2500} />
      <h3 className="category-title">Quản lý sản phẩm</h3>
      <Row>
        <Col md={8}>
          <p className="action-title">Các chức năng :</p>
          <div className="actionBtnContainer">
            <button onClick={handleShow} className="actions add-action">
              <IoIosAdd /> <span>Thêm sản phẩm</span>
            </button>
            <button onClick={updateProduct} className="actions edit-action">
              <IoIosCloudUpload /> <span>Cập nhật sản phẩm</span>
            </button>
            <button onClick={deleteProduct} className="actions delete-action">
              <IoIosTrash /> <span>Xóa sản phẩm</span>
            </button>
          </div>
        </Col>
        <Col md={4}>
          <p className="action-title">Tìm kiếm sản phẩm: </p>
          <div className="form-search">
            <Row>
              <Col md={9}>
                <Input
                  placeholder="Nhập tên sản phẩm"
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
          <Col md={2}>Tên sản phẩm</Col>
          <Col md={2}>Danh mục</Col>
          <Col md={2}>Giá</Col>
          <Col md={2}>Số lượng</Col>
          <Col md={2}>Mô tả</Col>
          <Col md={2}>Ảnh</Col>
        </Row>
        <Row>
          <Col>
            <CheckboxTree
              nodes={renderProducts()}
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
      <UpdateProductsModal
        show={updateProductModal}
        size="lg"
        handleClose={() => setUpdateProductModal(false)}
        onSubmit={updateProductsForm}
        modalTitle={"Sửa sản phẩm"}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleProductInput={handleProductInput}
        productList={productList}
      />
      {renderAddProductModal()}
      {renderDeleteProductModal()}
    </Layout>
  );
};

export default Products;
