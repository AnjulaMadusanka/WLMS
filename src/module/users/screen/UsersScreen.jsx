import React, { useEffect, useState } from "react";
import {
  IconButtonComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../component/atom";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import TableComponent from "../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../component/atom/Dialog/Dialog";
import { PopUpMessageComponent } from "../../../component/molecule";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import {
  AddUserForm,
  UpdateUserForm,
  ViewUserForm,
} from "../../../component/molecule/Forms";
import { useNavigate } from "react-router-dom";

const UsersScreen = ({
  getUserDetails,
  userList,
  userStatus,
  updateStatus,
  deleteAdminUser,
  deleteUser,
  verifyToken,
}) => {
  const [addUser, setAddUser] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [deleteUserPopup, setDeleteUserPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    setUsers(userList);
  }, [userList, userStatus, deleteUser, users, userData, userId]);

  useEffect(() => {
    getUserDetails({ type: 1 });
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
        display: true,
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_active",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <SwitchButtonComponet
              checked={value ? true : false}
              onChange={() => updateUserStatus(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },

    {
      name: "view",
      label: "View",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"viewIconbtn"}
              onclick={() => viewBtn(tableMeta)}
            />
          );
        },
      },
    },

    {
      name: "edit",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"editbtn"}
              onclick={() => editBtn(value, tableMeta, updateValue)}
            />
          );
        },
      },
    },

    {
      name: "delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        display: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"deleteIconbtn"}
              onclick={() => deleteUserSelect(tableMeta)}
            />
          );
        },
      },
    },
  ];

  const updateUserStatus = (tableMeta, value) => {
    const updateUsers = users?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.is_active;
        const updatedStatus = currentStatus == 1 ? 0 : 1;
        updateStatus({ user_id: tableMeta?.rowData[0], status: updatedStatus });
        return { ...item, updatedStatus };
      }
      return item;
    });

    setUsers(updateUsers);
  };

  const viewBtn = (tableMeta) => {
    users?.map((item) => {
      if (item?.id == tableMeta.rowData[0]) {
        setUserData(item);
      }
    });

    setViewUser(true);
  };

  const editBtn = (value, tableMeta, updateValue) => {
    users?.map((item) => {
      if (item?.id == tableMeta.rowData[0]) {
        setUserData(item);
      }
    });
    setEditUser(true);
  };

  const deleteUserSelect = (tableMeta) => {
    users?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        setUserId(item?.id);
      }
    });
    setDeleteUserPopup(true);
  };

  const deletebtnPress = () => {
    deleteAdminUser(userId);
    setDeleteUserPopup(false);
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between" alignItems={'center'}>
          <Grid item>
          <HeadingComponent
            text={"Users"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
          />
          </Grid>
          <Grid item>
          <TextIconButtonComponent
            btnText={"Add User"}
            icon={faUserPlus}
            onclick={() => setAddUser(true)}
          />
          </Grid>
         
         
        </Grid>
        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={users} />
        </Box>
      </Box>

      <PopUpMessageComponent
        open={deleteUserPopup}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete?"}
        btntext={"Yes, delete"}
        onclick={() => deletebtnPress()}
        altbtntext={"No"}
        altonclick={() => setDeleteUserPopup(false)}
        onclose={() => setDeleteUserPopup(false)}
      />
      <DialogComponent
        title={"Add User"}
        children={
          <AddUserForm type={"add"} onclickcancel={() => setAddUser(false)} />
        }
        open={addUser}
        onClose={() => setAddUser(false)}
      />
      <DialogComponent
        title={"View User"}
        children={
          <ViewUserForm data={userData} onClose={() => setViewUser(false)} />
        }
        open={viewUser}
        onClose={() => setViewUser(false)}
      />
      <DialogComponent
        title={"Edit User"}
        children={
          <UpdateUserForm
            user={userData}
            onclickcancel={() => setEditUser(false)}
          />
        }
        open={editUser}
        onClose={() => setEditUser(false)}
      />
    </>
  );
};

export default connect(
  (state) => ({
    userList: state.users.get("userList"),
    userStatus: state.users.get("userStatus"),
    deleteUser: state.users.get("deleteUser"),
  }),
  {
    getUserDetails: Actions.users.getAdminUserInfo,
    updateStatus: Actions.users.updateUserStatus,
    deleteAdminUser: Actions.users.deleteAdminUser,
    verifyToken: Actions.auth.verifyToken,
  }
)(UsersScreen);
