import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import TextButtonComponet from '../../atom/Buttons/TextButton';
import { IMAGES } from '../../../assets/Images';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PopUpMessageComponent = ({ type, onclick, message, title, btntext, altonclick, altbtntext, open, onclose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={"xs"}
            onClose={onclose}

            aria-describedby="alert-dialog-slide-description"
        >
           
            <Box >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {type === 'success' ? <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", m:1}}>
                        <img src={IMAGES.successVector} className='popup-alert-logo' alt='success' />
                        <DialogTitle style={{ fontSize: 35, fontWeight: 700, textAlign: "center", fontFamily: "Montserrat, sans serif" }}>Success</DialogTitle>
                    </Box> : null}

                    {type === 'error' ? <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", m:1}}>
                        <img src={IMAGES.errorVector} alt='error' className='popup-alert-logo' />
                        <DialogTitle style={{ fontSize: 35, fontWeight: 700, textAlign: "center", fontFamily: "Montserrat, sans serif" }}>Error</DialogTitle>
                    </Box> : null}

                    {type === 'other' ? <Box>
                        <DialogTitle style={{ fontSize: 35, fontWeight: 700, textAlign: "center", fontFamily: "Montserrat, sans serif" }}>{title}</DialogTitle>
                    </Box> : null}
                </Box>



                <DialogContentText>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <p style={{ fontFamily: "Montserrat", fontWeight: 500, color: "#2D3945", fontSize: 16 }}>{message}</p>
                    </Box>
                </DialogContentText>



                <Box sx={{ display: "flex", p: 2, gap: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <TextButtonComponet
                        text={btntext}
                        onButtonClick={onclick}
                        classStyle='btn btn-popup-danger' />
                    {altbtntext ? <TextButtonComponet
                        classStyle='btn btn-popup-secondary'
                        text={altbtntext}
                        onButtonClick={altonclick} /> : null}

                </Box>
            </Box>


        </Dialog>
    )
}

export default PopUpMessageComponent;