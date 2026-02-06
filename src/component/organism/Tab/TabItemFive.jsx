import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import _ from "lodash";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import moment from 'moment';
import { DocumentCard } from "../../molecule";
import { useNavigate } from "react-router-dom";
import { baseappURL } from "../../../core/repository/Repository";


const TabItemFive = ({ itemFiveData, onNavigatetoPreview, date, time, duration }) => {
    const navigate = useNavigate();



    const navigateToDocumentScreen = (item) => {
        navigate('/view-document', {
            state: {
                document:item,
                baseurl:baseappURL
              }
        });
    };
    return (
        <Grid container rowGap={2} columnGap={3}>
            {
                itemFiveData?.documents.length == 0 ? <span className="no-review-text" >
                    Currently, there are no Documents available for this course.
                </span> : <>
                    {
                        itemFiveData?.documents.map((item, index) => {
                            return (
                                <DocumentCard onViewDocument={() => navigateToDocumentScreen(item)} title={item.name.replace(/\.[^/.]+$/, '')} btnText={'View Document'} />
                            )
                        })
                    }
                </>
            }

        </Grid>
    )
}

export default TabItemFive;