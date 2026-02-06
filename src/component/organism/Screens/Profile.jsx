import React, { useState, useEffect, useRef, createRef, useCallback } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { ProfileForm } from "../../../component/molecule";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import { useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone';
import _ from "lodash";
import { USER_ROLE, getSourcePath } from "../../../core/Constant";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

let user = parseInt(localStorage.getItem('userType'));
const url = `https://winspert.archnix.com/deletion-request-form/`
export default ({ }) => {
    const [isEdit, setIsEdit] = useState(false);
    const uploadRef = useRef(null);
    const [img, setImg] = useState(null);
    const [imgPath, setImgPath] = useState('');
    const [isUploadedImg, setIsUploadedImg] = useState(false);
    const navigate = useNavigate()
    const [isopen, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const currentUser = useSelector(state => state.profile.get('currentUser'));
    useEffect(() => {
        setImgPath(getSourcePath(_.get(currentUser, 'profile_image', '')));
    }, [currentUser])

    const onDrop = useCallback((acceptedFiles) => {

        const file = acceptedFiles[0];

        if (file && file?.path) {
            if (!isEdit) {
                return
            }
            setImg(file);
            const objectUrl = URL.createObjectURL(file);
            setImgPath(objectUrl);
            setIsUploadedImg(true);
        }

    }, [isEdit])

    const { getRootProps, getInputProps, open } = useDropzone({ noClick: true, onDrop })

    const onBtnPress = () => {
        uploadRef.current.onPress({ file: img, isUpload: isUploadedImg })
        onEditProfile();
    };

    const removeImage = () => {
        setImg(null);
        setImgPath(getSourcePath(_.get(currentUser, 'profile_image', '')));
        setIsUploadedImg(false);
    }

    const onEditProfile = () => {
        setIsEdit(!isEdit);
    }

    return (
        <div {...getRootProps()}>
            <Grid xs={12} container mb={3} mt={5} className="Frame-8078"  >
                <Grid item xs={2} className="profileBox" >
                    <Avatar
                        className={"profileImage"}
                        alt="Remy Sharp" src={imgPath} />
                </Grid>
                <Grid item xs={7} className="profileBox" style={{ flexDirection: 'column', alignItems: "flex-start" }}>
                    <div>
                        <span className="Profile-PictureText">Profile Picture</span>
                    </div>
                    <div>
                        <span className="Profile-PictureText-description">This photo will be displayed on your profile</span>
                    </div>
                </Grid>
                {isEdit ? <Grid xs={3} item className="profileBox" style={{ justifyContent: "flex-start" }} >
                    <button onClick={open} type={'button'} className="pro-sm-btn pro-sm-btn-one">
                        <span className="uploadText">Upload</span>
                    </button>
                    <button onClick={removeImage} type={'button'} className="pro-sm-btn pro-sm-btn-two" style={{ color: "red" }}>
                        <DeleteOutlineOutlined color="secondary" />
                    </button>
                </Grid> : null}
            </Grid>

            <ProfileForm ref={uploadRef} file={isUploadedImg ? img : imgPath} isEdit={isEdit} />

            {isEdit ?
                <Grid item style={{ marginTop: '20px', padding: '10px' }} container className="profileBottom" rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                    <Grid className="profileButtonCoverSpB" item xs={12}>
                        <TextButtonComponet onButtonClick={() => {
                            onEditProfile();
                            removeImage();
                        }} classStyle={"btn buttonPro profileLightButton"} text={"Cancel"} />
                        <TextButtonComponet onButtonClick={onBtnPress} classStyle={"profileButton buttonPro"} text={"Save changes"} />
                    </Grid>
                </Grid>

                :
                // user == USER_ROLE.student ? 
                <Grid item style={{ marginTop: '20px', padding: '10px' }} container className="profileBottom" rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                    <Grid className="profileButtonCoverSpB" item xs={12}>
                        <TextButtonComponet onButtonClick={() => {
                           
                             handleClickOpen()
                        }} classStyle={"btn buttonPro profileLightButton"} text={"Delete user Account"} />
                        <TextButtonComponet onButtonClick={onEditProfile} classStyle={"profileButton buttonPro"} text={"Edit profile"} />
                    </Grid>
                </Grid>
                //  :
                //     <Grid item style={{ marginTop: '20px' }} className="profileBottom" container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                //         <Grid className="profileButtonCover" item xs={12}>

                //             <TextButtonComponet onButtonClick={onEditProfile} classStyle={"profileButton buttonPro"} text={"Edit profile"} />
                //         </Grid>
                //     </Grid>
            }

            <input
                {...getInputProps()}
                style={{ display: 'none' }} type={"file"} />

            <Dialog
                open={isopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        const newPageUrl = url
                       try{
                        window.webkit.messageHandlers.openURL.postMessage(url);
                       }catch{
                        window.open(url);
                       }
                       
                        // navigate("/DeleteAccountScreen")
                        //DeleteAccountScreen
                        handleClose()
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

