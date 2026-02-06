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

const PromoCodeScreen = ({ getpromoList, promoDetails, updateStatus }) => {
  const [promoData, setPromoData] = useState([]);
  const [promoDiscounts, setPromoDiscounts] = useState([]);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getpromoList();
  }, []);

  useEffect(() => {
    // let sortedArr = promoDetails?.map((data) => {
    //   return {
    //     ...data,
    //     start_date: moment(data?.start_date).format("DD/MM/YYYY"),
    //     end_date: moment(data?.end_date).format("DD/MM/YYYY"),
    //   };
    // });
    setPromoData(promoDetails);
  }, [promoDetails]);

  const updatePromoCodeStatus = (tableMeta, value) => {
    const updatedPromo = promoData?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.status;
        const updatedStatus = currentStatus == 1 ? 0 : 1;
        updateStatus({
          id: tableMeta?.rowData[0],
          status: updatedStatus,
        });

        return { ...item, updatedStatus };
      }
      return item;
    });

    setPromoData(updatedPromo);
  };

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
      name: "promo_code",
      label: "Promo Code",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "start_date",
      label: "Start Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "end_date",
      label: "Expiry Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {promoData?.map((item, index) => {
                if (item?.id == value) {
                  return (
                    <>
                      {item?.discount_type == 1 ? (
                        <span key={index + 1}>
                          {`${item?.promo_code_discount[0]?.discount}%`}
                        </span>
                      ) : (
                        <IconButtonComponent
                          btnType={"viewIconbtn"}
                          onclick={() => {
                            setView(true);
                            setPromoDiscounts(item?.promo_code_discount);
                          }}
                        />
                      )}
                    </>
                  );
                }
              })}
            </>
          );
        },
      },
    },

    {
      name: "discount_type",
      label: "Is Percentage",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value == 1 ? <span>Yes</span> : <span>No</span>}</>;
        },
      },
    },
    {
      name: "is_one_time",
      label: "Is One Time Use",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value == 1 ? <span>Yes</span> : <span>No</span>}</>;
        },
      },
    },
    {
      name: "id",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"editbtn"}
              onclick={() => onClickEdit(value)}
            />
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <SwitchButtonComponet
              checked={value ? true : false}
              onChange={() => updatePromoCodeStatus(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },
  ];

  const onClickEdit = (selectedId) => {
    let selectedValues = promoData?.filter((item) => {
      if (item?.id == selectedId) {
        return item;
      }
    });
    navigate("/edit-promo-code", { state: { values: selectedValues[0] } });
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
              text={"Promo Code"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item>
            <TextIconButtonComponent
              btnText={"Add Promo Code"}
              icon={faTags}
              onclick={() => navigate("/add-promo-code")}
            />
          </Grid>
        </Grid>
        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={promoData} />
        </Box>
      </Box>

      <DialogComponent
        title={"View Amounts"}
        children={<ViewPromoByAmount list={promoDiscounts} />}
        onClose={() => setView(false)}
        open={view}
      />
    </>
  );
};

export default connect(
  (state) => ({
    promoDetails: state.promoCode.get("promoDetails"),
    // userStatus: state.users.get("userStatus"),
    // deleteUser: state.users.get("deleteUser"),
  }),
  {
    getpromoList: Actions.promoCode.getPromoData,
    updateStatus: Actions.promoCode.updatePromoStatus,
    // deleteAdminUser: Actions.users.deleteAdminUser,
    // verifyToken: Actions.auth.verifyToken,
  }
)(PromoCodeScreen);
