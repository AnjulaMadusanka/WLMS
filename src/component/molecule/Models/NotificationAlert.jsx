import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { DialogActions, Grid } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationAlert({ data, isread = false,  handleClose = () => {} }) {
  const [open, setOpen] = React.useState();



  useEffect(()=>{
    setOpen(isread)
  },[isread])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ padding: 4, textAlign: "center" }}>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <NotificationsNoneOutlinedIcon sx={{ color: "#9834F0", fontSize: 80 }} />
            </Grid>
            <Grid item xs={12}>
              <DialogTitle sx={{ fontSize: 20, fontWeight: "bold", marginBottom: 1 }}>
                {data?.title}
              </DialogTitle>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText sx={{ fontSize: 18,fontWeight:'700' }}>
                {data?.message}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" autoFocus>
           View
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
