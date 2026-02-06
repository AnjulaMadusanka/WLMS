import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Box, List, ListItem, ListItemText, SvgIcon, Typography } from "@mui/material";
import _ from "lodash";
import TextButtonComponet from '../../atom/Buttons/TextButton';
import { getSourcePath, makeTruncate } from '../../../core/Constant';
import { Avatar, Button, Grid } from '@mui/material';
import moment from 'moment';


const MainForumCard = ({ icon, onclick, size, onForumView = () => { }, item, onJoinForm = () => { } }) => {
    const [replier, setReplier] = React.useState('');
    const [isOpen, setOpen] = React.useState(false);
    const [time, setTime] = React.useState('')

    React.useEffect(() => {
        const replies = _(_.get(item, 'forum_replies', [])).orderBy(['id'], ['desc']).value();
        if (replies && replies.length > 0) {
            const user = replies[0]?.replier_name;
            setReplier(user);
            setTime(moment(new Date(_.get(replies, '[0]updated_at', new Date()))).format('Do MMM YYYY'));
            setOpen(true)
        }
    }, [item])

    return (
        <Grid
            sx={{
                p: 2,
                margin: 'auto',
                backgroundColor: '#f2f6f8',
                borderRadius: '20px',
                mb:2
            }}
        >
            <Grid style={{backgroundColor: '#f2f6f8' }} container>
                <Grid xs={2} md={1} container item direction="row" justifyContent="center" alignItems="center">
                    <Avatar
                        className='forumAvatar'
                        alt={`${_.get(item, 'name', '')}`}
                        src={getSourcePath(_.get(item, 'image', ''))}
                    />
                </Grid>
                <Grid xs={10} md={9} item pl={2}>
                    <div>
                        <p className='forum-card-heading'>{_.get(item, 'name', '')}</p>
                        <p className='forum-card-subtext'>{makeTruncate(_.get(item, 'description', ''))}</p>
                    </div>
                </Grid>
                <Grid xs={6} md={2} item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    {item?.is_registered ?
                        <TextButtonComponet classStyle='btn btn-secondary' text={'View Forum'} onButtonClick={onForumView} />
                        :
                        <TextButtonComponet classStyle='btn btn-secondary purpleButton' text={'Join'} onButtonClick={onJoinForm} />
                    }

                </Grid>
                {isOpen ? <Grid item xs={12}>
                    <Grid style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-end' }} container>
                    <Grid item xs={1}></Grid>
                        <Grid item xs={11} pl={2} md={9}>
                            <Box sx={{ display: "contents" }}>
                                <SvgIcon sx={{ alignItems: 'center' }}>
                                    <Icon />
                                </SvgIcon>
                                <span className='announcement-link'> New reply from {`${replier}`}</span>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2} >
                            <p className='forum-card-subtext' style={{textAlign:"right",marginBottom:0}}>{time}</p>
                        </Grid>
                    </Grid>
                </Grid> : <>
                    <Grid item xs={12}>
                        <Grid style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-end' }} container>
                         <Grid item xs={1}></Grid>
                            <Grid item xs={11} pl={2} md={9}>
                                <Box sx={{ display: "contents" }}>
                                    <SvgIcon sx={{ alignItems: 'center' }}>
                                        <Icon />
                                    </SvgIcon>
                                    <span className='announcement-link'> Created by {`${_.get(item, 'creator', '')}`}</span>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <p className='forum-card-subtext' style={{textAlign:"right", marginBottom:0}}>{moment(new Date(_.get(item, 'created_at', new Date()))).format('Do MMM YYYY')}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </>}
            </Grid>
        </Grid>
    )

    // return (<Box className='announcement-card'>
    // <Avatar
    //     sx={{ width: 100, height: 100 }}
    //      alt={`${_.get(item, 'name', '')}`}
    //     src={getSourcePath(_.get(item, 'image', ''))}
    // />
    //     <Box sx={{ marginLeft: 2 }}>
    //         <p className='announcement-text'>{_.get(item, 'name', '')}</p>
    //         <p className='announcement-subtext'>{_.get(item, 'description', '')}</p>
    //         <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    //             <SvgIcon sx={{ alignItems: 'center' }}>
    //                 <Icon />
    //             </SvgIcon>
    //             <p className='announcement-link'>New reply from John cristy</p>
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    //         <TextButtonComponet classStyle='btn btn-secondary' text={'View Forum'} onButtonClick={onForumView} />
    //         <p className='announcement-subtext'>{moment(new Date(_.get(item, 'updated_at', new Date()))).format('Do MMM YYYY')}</p>
    //     </Box>
    // </Box>);
}

export default MainForumCard;

const Icon = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.0001 48.2134C61.3289 48.2134 70.5131 39.2504 70.5131 28.194C70.5131 17.1376 61.3289 8.17456 50.0001 8.17456C38.6712 8.17456 29.4873 17.1376 29.4873 28.194C29.4873 39.2504 38.6712 48.2134 50.0001 48.2134Z" fill="#778FA7" />
            <path d="M60.6838 56.5552H39.3163C26.9232 56.5552 16.6667 66.5654 16.6667 78.6601C16.6667 81.5797 17.9488 84.0823 20.5129 85.3335C24.359 87.4188 32.9061 89.9206 50.0001 89.9206C67.0942 89.9206 75.6409 87.4188 79.4872 85.3335C81.6238 84.0823 83.3334 81.5797 83.3334 78.6601C83.3334 66.1481 73.0772 56.5552 60.6838 56.5552Z" fill="#778FA7" />
        </svg>
    )
}