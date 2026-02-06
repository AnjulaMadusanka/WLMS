import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DocumentViewerComponent from "../DocumentViewer/DocumentViewer";
import { DialogContent } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogFullScreen = ({open, onClose, title, data}) => {
    // const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <Dialog
    fullScreen
    open={open}
    onClose={onClose}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
      <h6 sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          {title}
        </h6>
       
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
       
      </Toolbar>
    </AppBar>

    <DialogContent>
     <DocumentViewerComponent fileName={data}/>
    </DialogContent>
    
  </Dialog>
  );
}

export default DialogFullScreen