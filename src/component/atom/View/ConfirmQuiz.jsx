import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { QuestionStatus } from "../../molecule/Cards";
import _ from "lodash"

export const ConfirmQuiz = ({ list = [] }) => {
  return (
    <Box sx={{ height: 500, overflow: 'scroll', m: 3 }} className="custom-scroll-quiz">
      <Container>
        <Grid container gap={2} sx={{ justifyContent: 'center' }}>
          {_.map(list, (item, index) => {
            return (
              <Grid item key={index + 1} xs={2}>
                <QuestionStatus data={item?.user_answer} question={index + 1} />
              </Grid>
            );
          })}
        </Grid>
        <Grid sx={{ justifyContent: 'center', marginTop:5 }} container gap={2}>
          <Grid item>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Montserrat",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Are you sure, You want to sumbit the answeres ?
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
