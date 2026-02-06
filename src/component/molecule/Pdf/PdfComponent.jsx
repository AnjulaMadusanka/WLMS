import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { Box, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


const PdfComponent = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [inputPageNumber, setInputPageNumber] = useState(1);
  const [newdocument,setDocument] = useState()
  const [baseUrl,setBaseUrl] = useState()

  useEffect(() => {
    setDocument(pdfFile.document)
    setBaseUrl(pdfFile.baseurl);
    const disableRightClick = (event) => {
      if (event.button === 2) {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [pdfFile]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setInputPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      setInputPageNumber(pageNumber + 1);
    }
  };

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale > 0.1) {
      setScale(scale - 0.1);
    }
  };

  const handlePageNumberChange = (event) => {
    setInputPageNumber(event.target.value);
  };

  const handlePageNumberSubmit = () => {
    const newPageNumber = Number(inputPageNumber);
    if (!isNaN(newPageNumber) && newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    } else {
      setInputPageNumber(pageNumber);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handlePageNumberSubmit();
    }
  };

  return (
    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 4, padding: 2 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={12}  lg={4}>
          <p style={{ textAlign: "center", fontSize: 18, fontWeight: "700" }}>
            {newdocument?.name?.replace(/\.[^/.]+$/, "")}
          </p>
        </Grid>
       
        <Grid
          item
          xs={12}
          md={12}
          lg={8}
          gap={2}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <IconButton
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            sx={{
              backgroundColor: "white",
              color: "#9834F0",
              border: "1px solid #9834F0",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#9834F0",
                color: "white",
              },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography sx={{fontWeight:'500'}}>
            Page
          </Typography>
          <TextField
            value={inputPageNumber}
            onChange={handlePageNumberChange}
            onBlur={handlePageNumberSubmit}
            onKeyPress={handleKeyPress}
            inputProps={{ min: 1, max: numPages }}
            sx={{
              textAlign: 'center',
              minWidth:'60px',
              maxWidth:'60px',
              alignSelf:'center',
              '& .MuiInputBase-input': {
                textAlign: 'center',
                fontWeight:'500',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#9834F0',
                },
                '&:hover fieldset': {
                  borderColor: '#9834F0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9834F0',
                },
              },
            }}
          />
          <Typography sx={{fontWeight:'500'}}>
            of {numPages}
          </Typography>
          <IconButton
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            sx={{
              backgroundColor: "white",
              color: "#9834F0",
              border: "1px solid #9834F0",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#9834F0",
                color: "white",
              },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "white",
              color: "#9834F0",
              border: "1px solid #9834F0",
              "&:hover": {
                backgroundColor: "#9834F0",
                color: "white",
              },
            }}
            onClick={handleZoomIn}
            disabled={scale >= 2.0}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "white",
              color: "#9834F0",
              border: "1px solid #9834F0",
              "&:hover": {
                backgroundColor: "#9834F0",
                color: "white",
              },
            }}
            onClick={handleZoomOut}
            disabled={scale <= 0.1}
          >
            <ZoomOutIcon />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          gap={2}
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
        >

        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Document
          file={baseUrl + newdocument?.path}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Box border={1}>
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              sx={{ border: "1px solid #e0e0e0", borderRadius: 4 }}
            />
          </Box>
        </Document>
      </Grid>
    </Box>
  );
};

export default PdfComponent;
