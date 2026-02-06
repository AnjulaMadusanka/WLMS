import React, { useEffect } from "react";
import { Divider, Grid } from "@mui/material";

const ViewPromoByAmount = ({ list }) => {
  useEffect(() => {}, [list]);

  return (
    <>
      <Grid container p={2} gap={2} justifyContent={"center"}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
              <span style={{fontSize:18, fontWeight:700, fontFamily:'Montserrat'}}>Currency</span>
            </Grid>
            <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
              <span style={{fontSize:18, fontWeight:700, fontFamily:'Montserrat'}}>Currency Name</span>
            </Grid>
            <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
              <span style={{fontSize:18, fontWeight:700, fontFamily:'Montserrat'}}>Amount</span>
            </Grid>
          </Grid>
        </Grid>

        {list?.map((item, index) => {
          return (
            <Grid item xs={12} key={index + 1}>
              <Grid container>
                <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
                  <span>{item?.currency?.currency} </span>
                </Grid>
                <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
                  <span>{item?.currency?.currency_name}</span>
                </Grid>
                <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
                  <span>{item?.discount}</span>
                </Grid>
              </Grid>
              <Divider variant="middle"/>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ViewPromoByAmount;
