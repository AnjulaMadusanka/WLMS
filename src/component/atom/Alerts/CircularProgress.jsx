import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
   const [time, setTime]=useState('');

   useEffect(()=>{
    if(props.text.includes('undefined')|| props.text.includes('[object Object]') ){
      setTime(props?.duration)
    }else{
      setTime(props.text)
    }
   },[props])
  

  return (
    <Box display='flex' justifyContent='center' alignItems='center' position={'relative'}>
      <CircularProgress style={{ zIndex: 9999, color: props.newcolor }} size={60} variant="determinate" {...props} />
      <Box width={60} height={60} position={'absolute'} display='flex' justifyContent='center' alignItems='center' border={6} borderColor={'#f2f6f8'} borderRadius={300}></Box>
      <span style={{fontWeight:'bold',color:'#2d3945', fontSize:'12px',position:'absolute'}} display={time} >{time}
      {/* {props.type} */}
      </span>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ progress = '3', color = '#28b882', type = '', text = '0' }) {
  // const [newprogress, setProgress] = React.useState(progress);

  return <CircularProgressWithLabel text={text} value={progress} newcolor={color} type={type} />;
}
