import { Box } from "@mui/material";
import React ,{useEffect,useState} from "react";
import Typography from '@mui/material/Typography';
import  _ from "lodash";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import moment from 'moment';


const TabItemFour = ({itemFourData,onNavigatetoPreview,date,time,duration}) =>{

  const tim = _.get(itemFourData,'time','');
  const newTime = tim.split(':').slice(0,2).join(":")

    const [data,setData] = useState([])
    let list = []
      const onViewWebinar = () =>{
           const link = itemFourData.join_url
           window.location.href = link;
      }
    return(
        <Box>
                    <Typography style={{display:'flex',flexDirection:'column'}} color={"#2d3945"} fontSize={25} fontWeight={800}>
        Live Class
  </Typography>
  <p style={{fontFamily: 'Montserrat',
  fontSize: '20px',
  fontWeight: 500,
  textAlign: 'left',
  color: '#4a6375'}}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of document or a typeface without relying on meaningful.</p>
   <p style={{fontFamily: 'Montserrat',
  fontSize: '22px',
  fontWeight: 600,
  textAlign: 'left',
  color: '#2d3945'}}>Date - {moment(new Date(_.get(itemFourData, 'date', new Date()))).format('DD MM YYYY')}</p>
    {/* <p style={{fontFamily: 'Montserrat',
  fontSize: '22px',
  fontWeight: 600,
  textAlign: 'left',
  color: '#2d3945'}}>Time - {moment(itemFourData.time).format("HH:mm")}</p> */}
      <p style={{fontFamily: 'Montserrat',
  fontSize: '22px',
  fontWeight: 600,
  textAlign: 'left',
  color: '#2d3945'}}>Time - {newTime} {_.get(itemFourData,'time_ext','')}</p>
    <p style={{fontFamily: 'Montserrat',
  fontSize: '22px',
  fontWeight: 600,
  textAlign: 'left',
  color: '#2d3945'}}>Duration - {itemFourData.duration} hour</p>
  <Box sx={{width:300}}>
  <TextButtonComponet onButtonClick={onViewWebinar} text={'Click here to Join'}/>
  </Box>
        </Box>
    )
}

export default TabItemFour;