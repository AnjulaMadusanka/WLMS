import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import AdminVideoCard from "./admin/AdminVideoCard";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { IMAGE_URL } from "../../../core/Constant";

const SampleVideoCard = ({
  week,
  data,
  thumbnail,
  btnText,
  description,
  title,
  onViewVideo = () => {},
}) => {
  // useEffect(() => {});

  return (
    

    <Card sx={{ maxWidth: 280, minWidth: 280, borderRadius: 4 }}>
      <Box
        sx={{
          position: "relative",
          backgroundImage:
            "linear-gradient(to top, #2d3945, #292b34, #211e24, #161214, #000000)",
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={IMAGE_URL + thumbnail}
          alt="Card-image"
          style={{ opacity: 0.9 }}
        />
        <span
          style={{
            position: "absolute",
            color: "#8C8C8C",
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: 24,
            bottom: 10,
            left: "5%",
          }}
        >
          {description}
        </span>
      </Box>
      <CardContent>
        <Grid container>
          <Grid item height={50}>
            <span
              title={title}
              style={{
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "Montserrat",
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3,
                maxHeight: "4.3rem",
                color: "#8C8C8C",
              }}
            >
              {title}
            </span>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <TextButtonComponet onButtonClick={onViewVideo} text={btnText} />
      </CardActions>
    </Card>
  );

  // </Box>);
};

export default SampleVideoCard;

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "black",
    backgroundColor: "white",
  },
};
