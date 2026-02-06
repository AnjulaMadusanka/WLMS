import { Button } from "@mui/material";
import React from "react";
import TextButtonComponet from "./TextButton";

let deferredPrompt;

window.addEventListener('beforeinstallprompt',(event)=>{
  event.preventDefault();
  deferredPrompt=event;
})

const AppDownloadButton = ({classStyle = "btn btn-enroll",style={}}) => {
    const handleDownloadClick = () => {
      
        // const deferredPrompt = window.deferredPrompt;
        console.log(window,'k',deferredPrompt)
        if (deferredPrompt) {
            // Trigger the installation prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // Clear the deferredPrompt variable
                window.deferredPrompt = null;
            });
        }
    };
    return (
        <TextButtonComponet type="button" className={classStyle} style={style} text={'Download Student\'s App'} onClick={handleDownloadClick}/>
            
    );
};
export default AppDownloadButton;