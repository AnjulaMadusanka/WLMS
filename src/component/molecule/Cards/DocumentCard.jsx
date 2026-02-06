import React from "react";
import { Box, Card, CardActions, CardContent, Grid } from "@mui/material";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { CardMedia } from "@mui/material";
import { IMAGES } from "../../../assets/Images";

const DocumentCard = ({
  title,
  btnText,
  onViewDocument = () => {},
}) => {
  return (
    <Card sx={{ maxWidth: 280, minWidth: 280, borderRadius: 6 }}>
      <Box
        sx={{
          position: "relative",
          backgroundImage:
            "linear-gradient(to top, #2d3945, #292b34, #211e24, #161214, #000000)",
        }}
      >
        <CardMedia
          component="img"
          src={IMAGES.pdfImage}
          alt="Card-image"
          style={{ opacity: 1 }}
        />
      </Box>
      <CardContent>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <span
              title={title}
              style={{
                color: "#8C8C8C",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 18,
                textAlign: "center",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </span>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <TextButtonComponet onButtonClick={onViewDocument} text={btnText} />
      </CardActions>
    </Card>
  );
};

export default DocumentCard;
