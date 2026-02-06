import React, { useEffect, useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, List, ListItem, ListItemText, Badge } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import Pagination from '@mui/material/Pagination';
import _ from "lodash";
import SendMessageForm from '../Forms/SendMessageForm';
import { ForumMessageComponent, ForumTop } from '../../atom';
import TextButtonComponet from '../../atom/Buttons/TextButton';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import { getSourcePath, getText, setText } from '../../../core/Constant';
import { Actions } from '../../../core/modules/Actions';



const ForumMessageCard = ({ icon, onclick, size, onForumView = () => { }, forumId }) => {
    const selectedForumReplyList = useSelector(state => state.forum.get('selectedForumReplyList'));
    const selectedForum = useSelector(state => state.forum.get('selectedForum'));
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [imgList, setImgList] = useState([]);
    const [imgValid, setImgValid] = useState(false);

    const [messsage, setMessage] = useState('');
    const [isMessageValid, setIsMessageValid] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {

        const list = _.map(acceptedFiles, file => {
            const imgUrl = URL.createObjectURL(file);
            return {
                file,
                imgUrl
            }
        });
        const newList = [...imgList, ...list];
        if (newList.length < 5) {
            setImgList(newList);
            setImgValid(true);
        } else {
            setImgValid(false);
        }
    }, [imgList]);

    const { getRootProps, getInputProps, open } = useDropzone({ noClick: true, onDrop })

    useEffect(() => {
        setList(selectedForumReplyList.map((item) => {
            return { ...item, type: 1 }
        }));
    }, [selectedForumReplyList]);

    useEffect(() => {
        setData(selectedForum);
    }, [selectedForum]);

    const onMessage = (e) => {
        const text = getText(e);
        setMessage(text);
        setIsMessageValid(text.length > 0)

    }

    const onClean = () => {
        onMessage(setText(''));
        setImgList([]);
        setImgValid(false);
    }

    const onSend = () => {
        const fd = new FormData();
        fd.append('reply', messsage);
        fd.append('forum_id', selectedForum?.id);
        for (const data of imgList) {
            const image = data.file;
            fd.append("images[]", image);
        }


        dispatch(Actions.forum.sendThreadMessage(fd))
        onClean()
    }


    return (

        <Box {...getRootProps()} className="forum-wrap">
            <ForumTop />
            <Box className="forum-body"  >

                <Box sx={{
                    overflow: 'auto',
                    maxHeight: 'auto',
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {list?.map((forum, index) => (<Box key={index + 'forumStList'} p={2}>
                        <ForumMessageComponent item={forum} />
                    </Box>))}
                </Box>


                <Box sx={{ backgroundColor: "fff", marginTop: "auto" }}>
                    <Box>
                        <Grid spacing={1} container>
                            {
                                imgList.map((item, index) => {
                                    return (
                                        <Grid key={`forum-upload-list_${index}`}  item xs={1}>
                                            <Badge onClick={() => {
                                                const newList = _.filter(imgList, (item, id) => id != index);
                                                setImgList(newList);
                                                setImgValid(newList.length > 0)
                                            }} badgeContent={"X"} color="primary">
                                                <img className='squareImg forumAvatar' src={item?.imgUrl} alt={`upload-forum-img`} />
                                            </Badge>
                                        </Grid>
                                    )
                                })

                            }
                        </Grid>
                    </Box>
                    <SendMessageForm value={messsage} onSend={onSend} isValid={imgValid || isMessageValid} onchange={onMessage} onPress={open} />
                </Box>
            </Box>
            <input
                {...getInputProps()}
                style={{ display: 'none' }} type={"file"} />
        </Box>
    );
}

export default ForumMessageCard;