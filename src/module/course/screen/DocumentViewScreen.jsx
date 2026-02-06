import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import {
  IMAGE_URL,
  getText,
  onGetCountrySymble,
  onGetCurrencySymble,
} from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { IconButtonComponent } from "../../../component/atom";
//import { pdfjs } from "react-pdf";
import { PdfComponent } from "../../../component/molecule";
import { baseURL } from "../../../core/repository/Repository";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

const DocumentViewScreen = ({

  
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [documentdata,setDocument] = useState([]);

  useEffect(() => {
    const document = location?.state;
    setDocument(document)
  }, [location]);





 

  return (
    <>

      <Box>
        <Box>
          <IconButtonComponent
            onclick={() => navigate(-1)}
            btnType="backbtn"
            btnText="Back"
          />
        </Box>
  <PdfComponent pdfFile={documentdata}/>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
  
  }),
  {
 
  }
)(DocumentViewScreen);


