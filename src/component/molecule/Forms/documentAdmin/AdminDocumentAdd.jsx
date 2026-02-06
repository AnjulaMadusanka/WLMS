

// const AdminForumCreate = () => {
//     return(<></>);
// }

// export default AdminForumCreate;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, DialogActions, DialogContent, Button, Grid, SvgIcon } from "@mui/material";

import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import _ from "lodash"
import { Actions } from "../../../../core/modules/Actions";
import { getText, setText } from "../../../../core/Constant";
import { TextInputComponent } from "../../../atom";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import DropDownComponent from "../../../atom/Inputs/DropDown";

const AdminDocumentAdd =  ({ onClose = () => { },courseList  }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [newcourseList, setCourseList] = useState([]);
    const [course, setCourse] = useState("");

    const [isNameValid, setIsNameValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);

    const [isNameError, setIsNameError] = useState(false);


    const [thumbnailError, setThumbnailError] = useState(false);
    const [img, setImg] = useState(null);
    const [imgPath, setImgPath] = useState('');
    const [isThumbnailValid, setThumbNailValid] = useState(false);

    const dipatch = useDispatch();

   

    const onDrop = useCallback((acceptedFiles) => {

        const file = acceptedFiles[0];

        if (file && file?.path) {

            setImg(file);
            const objectUrl = URL.createObjectURL(file);
            setImgPath(objectUrl);
            setThumbNailValid(true);
            setThumbnailError(false);
        }

    }, [])

    const { getRootProps, getInputProps, open } = useDropzone({ noClick: true, onDrop });

    const onReset = () => {
        onNameChange(setText(''));
        setImg(null);
        setImgPath('');
        setThumbNailValid(false);
        setThumbnailError(false);
    }


    const onAddDocument = () => {
          if(isThumbnailValid){
            const fd = new FormData();
            fd.append('course_id',course)
            fd.append('document', img);
            dipatch(Actions.document.addDocument(fd));
            onClose();
            _.delay(() => {
                onReset();
            }, 1000)
          }else {
            if (!isThumbnailValid) {
                setThumbnailError(true);
            }
        }
      
    }

    const onNameChange = (e) => {
        const text = getText(e);
        setName(text);
        setIsNameError(false);
        setIsNameValid(text?.length > 0)
    };



    useEffect(() => {
        const list = _.map(courseList, (item, index) => {
            return {
                id: item.id,
                course_id: item.id,
                name: item.name,
            };
        });
        setCourseList(list);
        setCourse(list[0]?.id);
    }, [courseList]);

    const onCourseChange = (e) => {
        const Selectedvalue = getText(e);
        setCourse(Selectedvalue);
    }

    return (
        <div {...getRootProps()}>
            <DialogContent>
                <Grid container >
                <Grid xs={12} item>
                        <DropDownComponent
                               isShowPlaceholder={true}
                               isShowZero={newcourseList.length > 0 ? false : true}
                               initialValue="Select Course"
                               radius={'15px'}
                               onchange={onCourseChange}
                               dropdownLabel="Select Course"
                               list={newcourseList}
                               selectedValue={course}
                        />
                    </Grid>
                    <Grid xs={5} item>
                        <Box style={{ padding: 10 }}>
                            <p style={{ padding: 0, margin: 0, color: "#4E657C", fontSize: 19, fontWeight: 500, fontFamily: 'Montserrat', marginBottom: 10 }}>Document</p>
                            {thumbnailError ?
                                <p style={{ padding: 0, margin: 0, color: "#d06060", fontSize: 19, fontWeight: 500, fontFamily: 'Montserrat', marginBottom: 10 }}>Please add Image</p>
                                :
                                <></>
                            }
                            <button onClick={open} className="btn" type={'button'} style={{ borderRadius: 15, borderColor: '#778fa7', backgroundColor: '#ffffff', height: '80px', display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center' }} title='Click to upload'>

                                <UploadSvg />
                                <span>Click to upload</span>



                            </button>
                        </Box>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }} xs={7} item>
                    {img ?
                                <p style={{ padding: 0, margin: 0, color: "#65C466", fontSize: 19, fontWeight: 500, fontFamily: 'Montserrat' }}>PDF Selected Successfully</p>
                                :
                                <></>
                            }
                    </Grid>

                    <Grid item xs={6} mt={2}>
                        <Box style={{ padding: 10 }}>
                            <TextButtonComponet onButtonClick={() => {
                                onClose()
                            }} text={"Cancel"}
                                classStyle="btn btn-secondary" />

                        </Box>
                    </Grid>
                    <Grid item xs={6} mt={2}>
                        <Box style={{ padding: 10 }}>
                            <TextButtonComponet onButtonClick={() => {
                                onAddDocument();
                            }} text={"Create"} />
                        </Box>
                    </Grid>


                </Grid>
                <input
                    {...getInputProps()}
                    style={{ display: 'none' }} type={"file"} />
            </DialogContent>
        </div>
    )
}


const UploadSvg = () => {
    return (
        <svg width="30%" height="50%" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.2916 32.1249L45.8333 22.5416V62.4999C45.8333 63.605 46.2722 64.6648 47.0536 65.4462C47.835 66.2276 48.8949 66.6666 49.9999 66.6666C51.105 66.6666 52.1648 66.2276 52.9462 65.4462C53.7276 64.6648 54.1666 63.605 54.1666 62.4999V22.5416L63.7083 32.1249C64.0956 32.5154 64.5564 32.8254 65.0642 33.0369C65.5719 33.2485 66.1165 33.3574 66.6666 33.3574C67.2166 33.3574 67.7612 33.2485 68.269 33.0369C68.7767 32.8254 69.2376 32.5154 69.6249 32.1249C70.0155 31.7376 70.3254 31.2767 70.537 30.769C70.7485 30.2612 70.8574 29.7166 70.8574 29.1666C70.8574 28.6165 70.7485 28.0719 70.537 27.5642C70.3254 27.0564 70.0155 26.5956 69.6249 26.2082L52.9583 9.54156C52.562 9.16222 52.0947 8.86487 51.5833 8.66656C50.5688 8.24982 49.431 8.24982 48.4166 8.66656C47.9051 8.86487 47.4379 9.16222 47.0416 9.54156L30.3749 26.2082C29.9864 26.5967 29.6783 27.0579 29.468 27.5655C29.2578 28.0731 29.1495 28.6171 29.1495 29.1666C29.1495 29.716 29.2578 30.26 29.468 30.7676C29.6783 31.2752 29.9864 31.7364 30.3749 32.1249C30.7634 32.5134 31.2246 32.8216 31.7322 33.0318C32.2398 33.2421 32.7838 33.3503 33.3333 33.3503C33.8827 33.3503 34.4267 33.2421 34.9343 33.0318C35.4419 32.8216 35.9031 32.5134 36.2916 32.1249ZM87.4999 49.9999C86.3949 49.9999 85.335 50.4389 84.5536 51.2203C83.7722 52.0017 83.3333 53.0615 83.3333 54.1666V79.1666C83.3333 80.2716 82.8943 81.3314 82.1129 82.1129C81.3315 82.8943 80.2717 83.3332 79.1666 83.3332H20.8333C19.7282 83.3332 18.6684 82.8943 17.887 82.1129C17.1056 81.3314 16.6666 80.2716 16.6666 79.1666V54.1666C16.6666 53.0615 16.2276 52.0017 15.4462 51.2203C14.6648 50.4389 13.605 49.9999 12.4999 49.9999C11.3949 49.9999 10.335 50.4389 9.55364 51.2203C8.77224 52.0017 8.33325 53.0615 8.33325 54.1666V79.1666C8.33325 82.4818 9.65021 85.6612 11.9944 88.0054C14.3386 90.3496 17.518 91.6666 20.8333 91.6666H79.1666C82.4818 91.6666 85.6612 90.3496 88.0054 88.0054C90.3496 85.6612 91.6666 82.4818 91.6666 79.1666V54.1666C91.6666 53.0615 91.2276 52.0017 90.4462 51.2203C89.6648 50.4389 88.605 49.9999 87.4999 49.9999Z" fill="#4A6375" />
        </svg>
    )
}

export default AdminDocumentAdd;