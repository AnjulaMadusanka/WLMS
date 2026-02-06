import React, { useEffect, useState } from "react";
import { Avatar, Box, ImageList, ImageListItem } from "@mui/material";
import moment from "moment";
import _ from "lodash";
import { getSourcePath } from "../../../core/Constant";

export const ImageListCard = ({ images }) => {
    return (
        <Box>
            <ImageList className="messageImageList" cols={3} rowHeight={450}>
                {images.map((item,index) => (
                    <ImageListItem key={index+'messageImage'}>
                        <img
                            src={`${getSourcePath(item)}`}
                            srcSet={`${getSourcePath(item)}`}
                            alt={`index`}
                            loading="lazy"
                            style={{objectFit:'contain'}}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}