import React from "react";
import { Box, Divider, Grid } from "@mui/material";
import { TextIconButtonComponent } from "../../atom";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewSelectedCurrency = ({ list = [], onClickRemove = () => {} }) => {
  console.log("first: ", list )
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f2f6f8",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          p: 1,
        }}
      >
        {list?.map((item, index) => {
          const isRemoved = item?.isRemoved;
          return (
            <>
              <Grid container alignItems={"center"} p={2} key={index + 1}>
                <Grid item xs={2}>
                  <span className="curruncy-add-text">{item?.currency}</span>
                </Grid>
                <Grid item xs={8} sm={6}>
                  <span className="curruncy-add-text">{parseFloat(item?.amount).toFixed(2)}</span>
                </Grid>
                <Grid item xs={2} sm={4}>
                 {isRemoved ? <TextIconButtonComponent
                    backgroundColor="#ED8989"
                    borderColor="#ED8989"
                    icon={faTrash}
                    btnText={"Remove"}
                    onclick={() => onClickRemove(item)}
                  />: null}
                </Grid>
              </Grid>
              {list.length > 1 && index !== list.length - 1 ? <Divider variant="middle" /> : null}
            </>
          );
        })}
      </Box>
    </>
  );
};

export default ViewSelectedCurrency;
