import { Box, Grid } from "@mui/material";

const AssementButton = ({
  text,
  width = "auto",
  color,
  onButtonClick,
  backgroundColor = "white",
  btncolor = "",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 10,
        cursor: "pointer",
      }}
      onClick={onButtonClick}
    >
      <div style={{ width: 18, height: 10 }}>
        <p>{text < 10 ? `0${text}`: text}.</p>
      </div>
      <div style={{ width: 40, height: 10 }}>
        <Box
          style={{
            marginLeft: "15px",
            width: "20px",
            height: "20px",
            borderRadius: 30,
            backgroundColor: btncolor,
          }}
        ></Box>
      </div>
    </div>
  );
};
export default AssementButton;
