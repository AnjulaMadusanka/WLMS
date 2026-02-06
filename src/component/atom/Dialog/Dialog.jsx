import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid } from "@mui/material";
import IconButtonComponent from "../Buttons/IconButton";
import TextButtonComponet from "../Buttons/TextButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({
  open,
  onClose,
  title,
  children,
  maxwidth,
  student = false,
  btntextone,
  btntexttwo,
  onclickone,
  isShowCloseButton = true,
  backgroundColor = "#9834F0",
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={maxwidth}
      onClose={onClose}
      PaperProps={
        student
          ? { sx: { borderRadius: "45px", padding: 5, minWidth: 800 } }
          : {}
      }
      aria-describedby="alert-dialog-slide-description"
    >
      <Grid
        container
        style={{
          background: backgroundColor,
          display: "flex",
          justifyContent: isShowCloseButton ? "space-between" : "center",
        }}
      >
        <Grid item m={2}>
          <DialogTitle
            style={{
              fontSize: 24,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "Montserrat, sans serif",
            }}
          >
            {title}
          </DialogTitle>
        </Grid>
        {isShowCloseButton ? (
          <Grid item p={1}>
            <IconButtonComponent onclick={onClose} btnType={"closeIconbtn"} />
          </Grid>
        ) : null}
      </Grid>
      {children}
      {btntextone && btntexttwo ? (
        <DialogActions>
          <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
            <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <TextButtonComponet
                  text={btntextone}
                  classStyle="btn btn-primary"
                  onButtonClick={onclickone}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TextButtonComponet
                  text={btntexttwo}
                  classStyle="btn btn-secondary"
                  onButtonClick={() => onClose()}
                />
              </Box>
            </Box>
          </Box>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

export default DialogComponent;
