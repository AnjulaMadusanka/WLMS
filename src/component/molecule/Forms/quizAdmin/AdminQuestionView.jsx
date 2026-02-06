import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AnswerView, RadioButtonComponent } from "../../../atom";
import HeadingComponent from "../../../atom/Headings/Heading";
import _ from "lodash";
import { getSourcePath } from "../../../../core/Constant";

const AdminQuestionView = ({ item }) => {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);


  useEffect(() => {
    let answers = _.get(item, "answers", []);
    
    // Check if 'answers' is a string (JSON encoded)
    if (typeof answers === "string") {
      try {
        answers = JSON.parse(answers); // Parse it into an array
      } catch (error) {
        console.error("Error parsing answers JSON:", error);
        answers = [];
      }
    }
    
    console.log(item, answers, "answers");
    
    // Filter for correct answers
    const correct = _.filter(answers, (answer) => answer.is_correct == 1); // Ensure type consistency
    console.log(correct, answers, "correct");
  
    setAnswers(answers);
    setCorrectAnswers(correct);
  }, [item]);

  return (
    <Box className="admin-question" p={3}>
      {!item?.image == null || !item?.image == "" ? (
        <div
          style={{
            with: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Image"
            src={getSourcePath(_.get(item, "image", ""))}
            sx={{ width: 170, height: 170, borderRadius: 5 }}
          />
        </div>
      ) : null}

      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: `${_.get(item, "question", "")}`,
          }}
        />
      </Box>

      {answers.map((i, id) => {
        return <AnswerView item={i} key={`admin-answ-${id}`} />;
      })}
      <Box mt={3} mb={3}>
        <HeadingComponent
          text={"Correct Answer"}
          size={25}
          fontweigth={700}
          fontfamily={"Montserrat, sans serif"}
        />
        {correctAnswers.map((i, id) => {
          return (
            <AnswerView isShowRadio={false} item={i} key={`admin-answ-${id}`} />
          );
        })}
      </Box>

      <Box mt={3} mb={3}>
        <HeadingComponent
          text={"Reason"}
          size={25}
          fontweigth={700}
          fontfamily={"Montserrat, sans serif"}
        />
        <Box p={2}>
          {item?.reason !== null ? (
            <div
              dangerouslySetInnerHTML={{
                __html: item?.reason,
              }}
            />
          ) : (
            <p>Reason not found</p>
          )}

         
        </Box>
      </Box>
    </Box>
  );
};

export default AdminQuestionView;
