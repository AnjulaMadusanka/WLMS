import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import _ from "lodash"

export const QuestionStatus = ({
  data={},
  question = "01",
  status = "default",
  handleClick = () => {},
}) => {


  return (
    <Card
      sx={{
        borderRadius: 2,
        p: 1,
        cursor:'pointer',
        backgroundColor: _.get(data,'is_flag',0)?'#FFBF78':'#ffffff'
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Montserrat",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Q{question < 10 ? `0${question}` : question}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Montserrat",
            textAlign: "center",
            fontWeight: 600,
            color:
            _.get(data,'is_answered',0)?"#38E54D":"#686D76"
              // status == "answered"
              //   ? "#38E54D"
              //   : status == "flaged"
              //   ? ""
              //   : "#686D76",
          }}
        >
          {_.get(data,'is_answered',0)  ? "Ans" :  "N/Ans"}
        </Typography>
      </Box>
    </Card>
  );
};
