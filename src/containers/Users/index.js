import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import CheckboxTree from "react-checkbox-tree";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { TextField } from "@material-ui/core";
import { MdPlayArrow, MdArrowDropDownCircle } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Modal as ModalTrap,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Icon from "@material-ui/core/Icon";
import {
  getUsers,
  addUser,
  deleteUsers as deleteUsersAction,
  updateUsers as updateUsersAction,
} from "../../actions";
import UpdateUsersModal from "./components/UpdateUsersModal";
import "./style.css";
const Users = (props) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const user = useSelector((state) => state.auth.userList);
  const userLogin = useSelector((state) => state.auth.user);
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const notifyAdd = () => toast("Thêm người dùng thành công!");
  const notifyUpdate = () => toast("Cập nhật người dùng thành công!");
  const notifyDelete = () => toast("Xóa người dùng thành công!");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(getUsers());
    }
  }, [user]);

  const addUsers = () => {
    if (fullname === "") {
      alert("Mời nhập họ tên!");
      return;
    }
    if (email === "") {
      alert("Mời nhập Email!");
      return;
    }
    if (password === "") {
      alert("Mời nhập mật khẩu!");
      return;
    }
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email[0] == "@" ||
      email[0] == "." ||
      email.includes("@.") ||
      email.includes(".@") ||
      email[email.length - 1] == "@" ||
      email[email.length - 1] == "."
    ) {
      alert("Nhập sai định dạng email");
      return;
    }
    if (password.length < 6) {
      alert("Mời nhập mật khẩu tối thiểu 6 kí tự!");
      return;
    }
    dispatch(addUser({ fullname, email, password, role })).then(() => {
      notifyAdd();
      setFullname("");
      setEmail("");
      setPassword("");
      setModalShow(false);
    });
  };
  const deleteUser = () => {
    updateCheckedAndExpandedUsers();
    setDeleteUserModal(true);
  };
  const deleteUsers = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (checkedIdsArray.length > 0) {
      checkedArray.map((x) => {
        if (userLogin.role !== "admin" && x.role === "admin") {
          alert("Không có quyền xóa người dùng là admin!");
          return;
        } else if (userLogin.email === x.email) {
          alert("Không được xóa tài khoản đang đăng nhập!");
          return;
        } else {
          dispatch(deleteUsersAction(checkedIdsArray)).then(() => {
            dispatch(getUsers()).then(() => {
              notifyDelete();
            });
          });
        }
      });
    }
    setDeleteUserModal(false);
  };

  const renderDeleteUserModal = () => {
    return (
      <Modal
        modalTitle="Chắc chắn xóa người dùng này ?"
        show={deleteUserModal}
        handleClose={() => setDeleteUserModal(false)}
        buttons={[
          {
            label: "Không",
            color: "primary",
            onClick: () => {
              setDeleteUserModal(false);
            },
          },
          {
            label: "Có",
            color: "danger",
            onClick: deleteUsers,
          },
        ]}
      >
        {checkedArray.map((item, index) => (
          <ul>
            <li>
              <span key={index}>{item.fullname}</span>
            </li>
          </ul>
        ))}
      </Modal>
    );
  };
  const createUserList = (users, options = []) => {
    if (users) {
      for (let user of users) {
        options.push({
          value: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        });
      }
    }
    return options;
  };
  const updateCheckedAndExpandedUsers = () => {
    const users = createUserList(user);
    const checkedArray = [];
    checked.length > 0 &&
      checked.forEach((userId) => {
        const user = users.find((user, _index) => userId == user.value);
        user && checkedArray.push(user);
      });

    setCheckedArray(checkedArray);
  };

  const renderUsers = () => {
    if (search != "") {
      let newUser = [];
      newUser = user.filter((x) => {
        return x.fullname.toLowerCase().includes(search.toLowerCase().trim());
      });
      let list = [];
      if (newUser.length > 0) {
        for (let x of newUser) {
          list.push({
            label: (
              <Row>
                <Col md={4}>{x.fullname}</Col>
                <Col md={4}>{x.role}</Col>
                <Col md={4}>{x.email}</Col>
              </Row>
            ),
            value: x._id,
          });
        }
      }
      return list;
    } else {
      let list = [];
      if (user.length > 0) {
        for (let x of user) {
          list.push({
            label: (
              <Row>
                <Col md={4}>{x.fullname}</Col>
                <Col md={4}>{x.role}</Col>
                <Col md={4}>{x.email}</Col>
              </Row>
            ),
            value: x._id,
          });
        }
      }
      return list;
    }
  };

  const renderAddUserModal = () => {
    return (
      <ModalTrap show={modalShow} onHide={() => setModalShow(false)}>
        <ModalTrap.Header closeButton>
          <ModalTrap.Title>Thêm người dùng</ModalTrap.Title>
        </ModalTrap.Header>
        <ModalTrap.Body>
          <Container>
            <Row>
              <Col md={12}>
                <TextField
                  style={{ width: "100%", margin: "5px 0" }}
                  className="form-input flex-item"
                  type="text"
                  id="input-with-icon-textfield"
                  label="Họ tên"
                  variant="outlined"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Col>
              <Col md={12}>
                <TextField
                  style={{ width: "100%", margin: "5px 0" }}
                  className="form-input flex-item"
                  type="email"
                  id="input-with-icon-textfield"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md={12}>
                <TextField
                  style={{ width: "100%", margin: "5px 0" }}
                  className="form-input flex-item"
                  type="email"
                  id="input-with-icon-textfield"
                  label="Mật khẩu"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col md={12}>
                <p className="form-label">Chọn quyền</p>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option key="1" value="manager">
                    Manager
                  </option>
                  <option key="2" value="user">
                    User
                  </option>
                </select>
              </Col>
              <Col md={12}>
                <Button
                  style={{ width: "100%", margin: "5px 0" }}
                  className="form-btn btn-primary"
                  onClick={addUsers}
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>send</Icon>}
                >
                  Thêm
                </Button>
              </Col>
            </Row>
          </Container>
        </ModalTrap.Body>
      </ModalTrap>
    );
  };

  // ================================================================
  const updateUser = () => {
    updateCheckedAndExpandedUsers();
    setUpdateUserModal(true);
  };

  const updateUsersForm = async () => {
    const form = new Object();
    checkedArray.map((x) => {
      if (userLogin.role !== "admin" && x.role === "admin") {
        alert("Không có quyền sửa người dùng là admin!");
        return;
      }
    });

    checkedArray.forEach((item, index) => {
      form._id = item.value;
      form.role = item.role;
      form.fullname = item.fullname;
      form.email = item.email;
    });

    dispatch(updateUsersAction(form)).then(() => {
      dispatch(getUsers()).then(() => {
        notifyUpdate();
      });
    });
  };

  const handleUserInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    }
  };
  const userList = createUserList(user);

  return (
    <Layout sidebar>
      <ToastContainer autoClose={2500} />
      <h3 className="category-title">Quản lý người dùng</h3>
      <Row>
        <Col md={8}>
          <p className="action-title">Các chức năng :</p>
          <div className="actionBtnContainer">
            <button
              onClick={() => setModalShow(true)}
              className="actions add-action"
            >
              <IoIosAdd /> <span>Thêm người dùng</span>
            </button>
            <button onClick={updateUser} className="actions edit-action">
              <IoIosCloudUpload /> <span>Cập nhật người dùng</span>
            </button>
            <button onClick={deleteUser} className="actions delete-action">
              <IoIosTrash /> <span>Xóa người dùng</span>
            </button>
          </div>
        </Col>
        <Col md={4}>
          <p className="action-title">Tìm kiếm người dùng: </p>
          <div className="form-search">
            <Row>
              <Col md={9}>
                <Input
                  placeholder="Nhập tên người dùng"
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
          <Col md={4}>Họ tên</Col>
          <Col md={4}>Quyền</Col>
          <Col md={4}>Email</Col>
        </Row>
        <Row>
          <Col>
            <CheckboxTree
              nodes={user ? renderUsers() : []}
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
      <UpdateUsersModal
        show={updateUserModal}
        size="lg"
        handleClose={() => setUpdateUserModal(false)}
        onSubmit={updateUsersForm}
        modalTitle={"Cập nhật người dùng"}
        checkedArray={checkedArray}
        handleUserInput={handleUserInput}
        userList={userList}
      />
      {renderAddUserModal()}
      {renderDeleteUserModal()}
    </Layout>
  );
};

export default Users;
