import React from "react";
import background from "../../../assets/Images/splash_screen_background.png";
import Logo from "../../../assets/Images/logo_white.png";
import { Grid, Stack,} from "@mui/material";



export default ({ }) => {
    return (
        <Grid className="splashBox"
            style={{ backgroundImage: `url(${background})` }}
            container spacing={5}>
            <Grid item xs={12} >
                <Stack className="stackSplash" direction={'column'} spacing={2} >
                    <img className={'Winspert-logo'} src={Logo} />
                </Stack>
            </Grid>
        </Grid>
    )
}