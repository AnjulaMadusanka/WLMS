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
import {
  PopUpMessageComponent,
  ViewPromoByAmount,
} from "../../../component/molecule";
import { faTags, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AdminCategoryCreate, AdminCategoryEdit } from "../../../component/molecule/Forms";

const CategoryMainScreen = ({ getCategoryList, categoryList, updateStatus ,deleteCategory}) => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({});
  const [isdeleteCategory, setIsDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
//   const [promoDiscounts, setPromoDiscounts] = useState([]);
//   const [view, setView] = useState(false);
//   const navigate = useNavigate();

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    setCategoryData(categoryList);
  }, [categoryList]);


  const onDeleteCategory = () => {
    deleteCategory(selectedCategory)
    setIsDeleteCategory(false)
    // setSelectedQuiz('');
    onDeleteClose();
  };

  const onDeleteClose = () => {
    setIsDeleteCategory(false);
    setSelectedCategory("");
  };

  const handleDelete = (tableMeta) => {
    categoryData?.map((category) => {
      if (category?.id == tableMeta.rowData[0]) {
        setSelectedCategory(category.id)
      }
    });
    setIsDeleteCategory(true)
  };


//   const updatePromoCodeStatus = (tableMeta, value) => {
//     const updatedPromo = promoData?.map((item) => {
//       if (item?.id == tableMeta?.rowData[0]) {
//         const currentStatus = item?.status;
//         const updatedStatus = currentStatus == 1 ? 0 : 1;
//         updateStatus({
//           id: tableMeta?.rowData[0],
//           status: updatedStatus,
//         });

//         return { ...item, updatedStatus };
//       }
//       return item;
//     });

//     setPromoData(updatedPromo);
//   };

const dummyData = [
  { id: 1, promo_code: "General Dentistry", status: 1 },
  { id: 2, promo_code: "Cosmetic Dentistry", status: 0 },
  { id: 3, promo_code: "Orthodontics", status: 1 },
];

const [open,setOpen] = useState(false)
const [edit,setEdit] = useState(false)
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "upload",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"editbtn"}
              onclick={() => onClickEdit(tableMeta)}
            />
          );
        },
      },
    },
    {
      name: "id",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
            btnType={"deleteIconbtn"}
           onclick={() => handleDelete(tableMeta)}
          />
          );
        },
      },
    },
  ];

  // const onClickEdit = (tableMeta) => {
  //   console.log(tableMeta, 'tableMeta')
  //   categoryList?.map((category) => {
  //     if (category?.id == tableMeta.rowData[0]) {
  //       setCategoryData(category);
  //     }
  //   });
  //   setEdit(true);
  // };
  const onClickEdit = (tableMeta) => {
    const category = categoryData.find((category) => category?.id == tableMeta.rowData[0]);
    console.log(category, 'category');
    if (category) {
    setCategoryDetails(category);
    } else {
      console.error('No matching category found');
    }
    setEdit(true);
  };
  
  return (
    <>
      <Box className="main-screen-container">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Grid item>
            <HeadingComponent
              text={"Cluster"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item>
            <TextIconButtonComponent
              btnText={"Add Cluster"}
              // icon={faTags}
               onclick={() => setOpen(true)}
            />
          </Grid>
        </Grid>
        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={categoryData} />
        </Box>
      </Box>

      <DialogComponent
        isShowCloseButton={true}
        title={"Add Cluster"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AdminCategoryCreate onClose={() => setOpen(false)} />
      </DialogComponent>
      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Cluster"}
        open={edit}
        onClose={() => setEdit(false)}
      >
        <AdminCategoryEdit categoryDetails={categoryDetails} onClose={() => setEdit(false)} />
      </DialogComponent>
      <PopUpMessageComponent
        open={isdeleteCategory}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete cluster?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        onclick={onDeleteCategory}
        altonclick={onDeleteClose}
        onclose={onDeleteClose}
      />
    </>
  );
};

export default connect(
  (state) => ({
    promoDetails: state.promoCode.get("promoDetails"),
    categoryList: state.questions.get("categoryList"),
    // userStatus: state.users.get("userStatus"),
    // deleteUser: state.users.get("deleteUser"),
  }),
  {
    getpromoList: Actions.promoCode.getPromoData,
    updateStatus: Actions.promoCode.updatePromoStatus,
    getCategoryList: Actions.questions.getCategoryList,
    deleteCategory: Actions.questions.deleteCategory,
    // deleteAdminUser: Actions.users.deleteAdminUser,
    // verifyToken: Actions.auth.verifyToken,
  }
)(CategoryMainScreen);
