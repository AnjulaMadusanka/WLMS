import React, { useEffect, useRef, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import { PhoneNumberComponent, TextInputComponent } from "../../../atom";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import {
  EMAIL_REGEX,
  IMAGE_URL,
  PHONE_REGEX,
  emptyDropDown,
  getFile,
  getText,
  setText,
} from "../../../../core/Constant";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { Avatar } from "@mui/material";

const AdminAnnouncemntUpdateForm = ({
  id,
  onClose,
  item,
  getAnnouncementForAdmin,
  adminAnnouncementDetails,
  updateAnnouncementForAdmin,
}) => {
  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const [studyMaterial, setStudyMaterial] = useState("");
  // const [isStudyMaterialValid, setIsStudyMaterialValid] = useState(false);
  const [studyMaterialError, setStudyMaterialError] = useState(false);

  const [description, setDescription] = useState("");


  const [image, setImage] = useState('');

  const imageRef = useRef();

  useEffect(() => {
    setTitle(item?.title);
    setDescription(item?.message);
    setStudyMaterial(item?.material_link);
  }, [adminAnnouncementDetails, image, id, item]);

  useEffect(() => {
    getAnnouncementForAdmin(id);
  }, []);

  const onChangeTitle = (e) => {
    const text = getText(e);
    setTitle(text);
    setTitleError(false);
    setIsTitleValid(text?.length > 0);
  };

  const onChangeStudyMaterial = (e) => {
    const text = getText(e);
    setStudyMaterial(text);
    setStudyMaterialError(false);
    
  };

  const onChangeDescription = (e) => {
    const text = getText(e);
    setDescription(text);
  };

  const onChangeImage = (e) => {
    const file = getFile(e);

    if (file != "" && file != undefined) {
      setImage(file);
    } else {
      // setImage(adminAnnouncementDetails?.image);
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("id", item?.id);
    data.append("course", item?.course_type);
    data.append("title", title);
    data.append("message", description);
    data.append("study_material", studyMaterial);
    data.append("image", !image == '' ? image : '');
    updateAnnouncementForAdmin(
      data,
      item?.id
    );
    onClose();
  };

  return (
    <Box p={1}>
      <form>
        <DialogContent>
          <Box>
            {item?.image !== null ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={IMAGE_URL + item?.image}
                  sx={{ width: 150, height: "auto", borderRadius: 2 }}
                />
              </Box>
            ) : null}

            <TextInputComponent
              label={"Title"}
              name="title"
              value={title}
              onchange={onChangeTitle}
              placeholder="Title"
              readOnly={false}
              isError={titleError}
              error={"please enter a title"}
            />

            <TextInputComponent
              label={"Link"}
              name="study_material"
              value={studyMaterial}
              onchange={onChangeStudyMaterial}
              placeholder="Link"
              readOnly={false}
              isError={studyMaterialError}
              error={"Please enter a valid url"}
            />

            <TextAreaComponent
              textlabel={"Description"}
              placeholder={"Description"}
              error={"Please enter description"}
              value={description}
              onchange={onChangeDescription}
            />

            <Box style={{ padding: 10 }}>
              <label
                className="form-label"
                style={{
                  padding: 0,
                  margin: 0,
                  marginBottom: 10,
                  color: "#4E657C",
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                Image
              </label>
              <input
                className="form-control"
                type={"file"}
                accept="image/*"
                ref={imageRef}
                onChange={onChangeImage}
              />
              {/* { imageError ? <p className="input-error-text">{imageErrorMsg}</p> : null} */}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
            <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <TextButtonComponet
                  text="Update"
                  classStyle="btn btn-primary"
                  onButtonClick={handleSubmit}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TextButtonComponet
                  text="Cancel"
                  classStyle="btn btn-secondary"
                  onButtonClick={() => {
                    onClose();
                  }}
                />
              </Box>
            </Box>
          </Box>
        </DialogActions>
      </form>
    </Box>
  );
};

export default connect(
  (state) => ({
    adminAnnouncementDetails: state.announcement.get("adminAnnoucement"),
  }),
  {
    getAnnouncementForAdmin: Actions.announcement.getAnnouncementForAdmin,
    updateAnnouncementForAdmin: Actions.announcement.updateAnnouncementForAdmin,
  }
)(AdminAnnouncemntUpdateForm);
