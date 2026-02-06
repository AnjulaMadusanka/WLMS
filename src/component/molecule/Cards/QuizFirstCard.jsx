import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Box,List,ListItem,ListItemText, SvgIcon, Typography  } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { VideoListView } from '../../atom';
import TextButtonComponet from '../../atom/Buttons/TextButton';



const QuizFirstCard = ({ icon, onclick, size,onQuizStart }) => {
    return (<Box >
    <p className='announcement-subtext'>Enter the name of your quiz in the quiz title box. You can change this (and any other of the properties later if you change your mind). The title will usually appear at the top of the page throughout your quiz. You can opt to stop the title from appearing on every page by unticking a box in Question Options.

If you want to limit the time that can be spent on the quiz tick the box and then enter the time in seconds, minutes or hours. After the time limit is up, the quiz taker will be automatically forwarded to the end of the quiz to review their results and any feedback given.

The title will also be used to identify your quiz if you’re using Question Writer Tracker to collect responses and scores.</p>
<Box sx={{paddingTop:5,width:0.2}}>
<TextButtonComponet onButtonClick={onQuizStart} text={'Start quiz'}/> 
</Box> 
    
    </Box>);
}

export default QuizFirstCard;