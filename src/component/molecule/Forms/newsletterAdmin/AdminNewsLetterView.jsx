import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { IconButtonComponent, TextEditior } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";


const AdminNewsLetterView = ({ onClose, newsletterDetails }) => {
    const [newslettersgroup, setNewsletterGroup] = useState([]);
    const [newslettercontent, setNewslettercontent] = useState();
    const [newslettertitle, setNewslettertitle] = useState();
    const [newsletterstatus,setNewsletterStatus] = useState();
    const [contentValid, setIsContentValid] = useState(false);
    const [contentIsError, setIsContentError] = useState(false);
    const [usertype,setUsertype] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setNewslettertitle(newsletterDetails?.title);
        setNewslettercontent(newsletterDetails?.content)
        setNewsletterGroup(newsletterDetails?.user_group)
        setNewsletterStatus(newsletterDetails?.status)
        if(newsletterDetails?.user_group == 'All' || newsletterDetails?.user_group == 'Individual Users'){
            setUsertype(true)
        }
    }, [newsletterDetails]);

 

    const onChangeContent = (text) => {
        setIsContentError(false);
        setIsContentValid(text.length > 0);
        setNewslettercontent(text);
      }
    return (
        <>
                <DialogContent>
                <Box>
                        <TextInputComponent
                            label={"NewsLetter Title"}
                            name="name"
                            value={newslettertitle}
                            onchange={(e) => setNewslettertitle(e.target.value)}
                            placeholder="First Name"
                            readOnly={false}
                        />
                    </Box>
                  <Box style={{padding:10}}>
                  <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>Status</p>
                  <Box sx={{backgroundColor: newsletterstatus == 'Complete' ? '#65c466' : '#9934f0',padding:'5px',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',width:'25%'}}>
                  <span style={{ alignSelf:'center', color: "white", fontSize: 19, fontWeight: 700 }}>{newsletterstatus}</span>
                  </Box>
                  </Box>
                  <Box style={{padding:10}}>
                  <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>User Groups</p>
                  <Box sx={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:'100%'}}>
                {
                    usertype ? <>
                     {
                            <Box sx={{backgroundColor: '#9934f0',paddingY:'5px',paddingX:'10px',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginRight:2,marginBottom:2,}}>
                            <span style={{ alignSelf:'center', color: "white", fontSize: 19, fontWeight: 700 }}>{newslettersgroup}</span>
                            </Box>
                  }
                    </> : <>
                    {
                    newslettersgroup?.map((item,index)=>{
                        return(
                            <Box sx={{backgroundColor: '#9934f0',paddingY:'5px',paddingX:'10px',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginRight:2,marginBottom:2,}}>
                            <span style={{ alignSelf:'center', color: "white", fontSize: 19, fontWeight: 700 }}>{item}</span>
                            </Box>
                        )
                    })
                  }
                    </>
                }
                  </Box>
                  </Box>
                </DialogContent>

          

        </>
    );
}

export default AdminNewsLetterView;
