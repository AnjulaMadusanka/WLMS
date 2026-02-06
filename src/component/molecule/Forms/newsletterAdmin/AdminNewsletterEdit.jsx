import React, { useEffect, useRef, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { IconButtonComponent, TextEditior } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";
import { IMAGE_URL } from "../../../../core/Constant";
import _ from 'lodash'
import TextEditorTiny from "../../../atom/Inputs/TextEditorTiny";
import { baseURL } from "../../../../core/repository/Repository";

const AdminNewsletterEdit = ({ onClose, newsletterDetails }) => {
    const [newsletterslug, setNewsletterslug] = useState();
    const [newslettercontent, setNewslettercontent] = useState();
    const [newslettertitle, setNewslettertitle] = useState();
    const [contentValid, setIsContentValid] = useState(false);
    const [contentIsError, setIsContentError] = useState(false);
    const [newsletterId, setNewsLetterId] = useState()
    const [newcontent,setNewContent] = useState()
    const [images,setImages] = useState([])
    const dispatch = useDispatch();
    const [post_content, setPostContent] = useState("");
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setPostContent(editorRef.current.getContent());
            // console.log(editorRef.current.getContent());
        }
    };




    useEffect(() => {
        if (newsletterDetails) {
            setNewsletterslug(newsletterDetails?.slug);
            setNewslettertitle(newsletterDetails?.title);
            setNewsLetterId(newsletterDetails?.id);
            setPostContent(newsletterDetails?.content)
            // // Extract image paths and convert them to base64
            // if (newsletterDetails.image_paths) {
            //     const imagePaths = JSON.parse(newsletterDetails.image_paths);
            //     const fullImagePaths = imagePaths.map((path) => `${IMAGE_URL}${path}`); // Create full URL for each image
            //     convertImagesToBase64(fullImagePaths).then((base64Images) => {
            //         let updatedContent = newsletterDetails.content;
            //         base64Images.forEach((base64Image, index) => {
            //             // Replace src attribute in the content with the base64 image data
            //             updatedContent = updatedContent.replace(
            //                 new RegExp(`(<img[^>]+src=["'])([^"']*)["']`, "g"),
            //                 (match, p1) => `${p1}${base64Image}"`
            //             );
            //         });
            //         setNewslettercontent(updatedContent);
            //     });
            // }
        }
    }, [newsletterDetails]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('id',newsletterId)
        formData.append("content", post_content);
        formData.append("title", newslettertitle);
        
        
        dispatch(
            Actions.newsLetter.updateNewsletterContent(formData)
        );
        onClose();
    };

 

    const example_image_upload_handler = (blobInfo, progress) =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open("POST", `${baseURL}api/` + "newsLetter/image");
            xhr.upload.onprogress = (e) => {
                progress((e.loaded / e.total) * 100);
            };
            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status >= 300) {
                    reject("HTTP Error: " + xhr.status);
                    return;
                }
                const json = JSON.parse(xhr.responseText);

                // if (!json || typeof json.location != 'string') {
                //   reject('Invalid JSON: ' + xhr.responseText);
                //   return;
                // }
                resolve(`${IMAGE_URL}`  + json.data.image_path);
            };
            xhr.onerror = () => {
                reject(
                    "Image upload failed due to a XHR Transport error. Code: " +
                    xhr.status
                );
            };
            const formData = new FormData();
            formData.append("image", blobInfo.blob(), blobInfo.filename());
            xhr.send(formData);
        });


    return (
        <>
            <DialogContent>
                <Box>
                    <TextInputComponent
                        label={"NewsLetter Title"}
                        name="name"
                        value={newslettertitle}
                        onchange={(e) => setNewslettertitle(e.target.value)}
                        placeholder="Newsletter Title"
                        readOnly={false}
                    />
                </Box>
                <Box  p={1}>
                    {/* <TextEditior
                        height={500}
                        value={newslettercontent}
                        isError={contentIsError}
                        error="Please add Content"
                        label={"Content"}
                        placeholder={"Add Content"}
                        onchange={onChangeContent}
                    /> */}
                        <TextEditorTiny
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            onChange={log}
                            initialValue={post_content}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "anchor",
                                    "autolink",
                                    "image",
                                    "link",
                                    "lists",
                                    "searchreplace",
                                    "table",
                                    "media",
                                    "mediaembed",
                                    "wordcount",
                                ],
                                toolbar:
                                    "blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist image | " +
                                    "link table media | outdent indent",
                                toolbar_sticky: true,
                                content_style:
                                    "body { font-family:Roboto, sans-serif; font-size:16px }",
                                a11y_advanced_options: true,
                                image_advtab: true,
                                image_uploadtab: true,
                                automatic_uploads: true,
                                relative_urls: false,
                                remove_script_host: false,
                                images_upload_handler: example_image_upload_handler,
                            }}
                        />
                </Box>
            </DialogContent>

            <DialogActions>
                <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
                    <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <TextButtonComponet
                                text={"Update"}
                                classStyle="btn btn-primary"
                                onButtonClick={handleSubmit}
                            />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <TextButtonComponet
                                text={"Cancel"}
                                classStyle="btn btn-secondary"
                                onButtonClick={() => onClose()}
                            />
                        </Box>
                    </Box>
                </Box>
            </DialogActions>
        </>
    );
};

export default AdminNewsletterEdit;
