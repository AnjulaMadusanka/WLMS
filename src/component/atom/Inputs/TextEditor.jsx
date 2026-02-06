import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Box } from "@mui/material";
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);

// Utility function to extract image URLs
const extractImageUrls = (content) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const imageTags = doc.querySelectorAll("img");
  const imageUrls = [];
  imageTags.forEach((img) => {
    imageUrls.push(img.src);
  });
  return imageUrls;
};

// Utility function to convert base64 to File
const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const TextEditor = ({ onchange, value, label, placeholder, isError = false, error = "" }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  // const handleChange = (content) => {
  //   // Extract image URLs and convert base64 to files if necessary
  //   const imageUrls = extractImageUrls(content);
  //   const imageFiles = imageUrls
  //     .filter((url) => url.startsWith("data:")) // Filter only base64 URLs
  //     .map((url, index) => base64ToFile(url, `image_${index}.png`));

  //   // Pass content and images to the parent component
  //   onchange(content, imageFiles);
  // };

  const handleChange = (content) => {
    // Extract image URLs from content
    const imageUrls = extractImageUrls(content);
  
    // Filter and convert base64 image URLs to files
    const imageFiles = imageUrls
      .filter((url) => url.startsWith("data:image/"))
      .map((base64Url, index) => base64ToFile(base64Url, `image_${index}.png`));
  
    // Remove `data:image/` strings from the content
    let updatedContent = content.replace(/data:image\/[^;]+;base64[^"]+/g, "");
  
    // Call the `onchange` function with the updated content and image files
    onchange(content, imageFiles,updatedContent);
  };

  return (
    <Box style={{ padding: 10 }}>
      <p
        style={{
          padding: 0,
          margin: 0,
          marginBottom: 10,
          color: "#4E657C",
          fontSize: 19,
          fontWeight: 700,
        }}
      >
        {label}
      </p>
      <ReactQuill
        className="text-editor"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        bounds="#root"
      />
      {isError && <p className="input-error-text">{error}</p>}
    </Box>
  );
};

export default TextEditor;

