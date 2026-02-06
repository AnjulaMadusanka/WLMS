import React from "react";
// import ReactDOM from "react-dom";
// import FileViewer from "react-file-viewer";
// import DocViewer from "react-doc-viewer";



import "../../../assets/styles/components/fileViewer.scss";
import { IMAGE_URL, getFileType } from "../../../core/Constant";
// import { CustomErrorComponent } from 'custom-error';

// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocumentViewerComponent = ({ fileName }) => {
  // const onError = (e) => {
  //   console.log(e, "error in file-viewer");
  // };

  const docs = [
    { uri: IMAGE_URL + fileName },
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  return (
    <>
    {/* <DocViewer documents={docs} /> */}
      {/* <FileViewer
        fileType={getFileType(fileName)}
        filePath={IMAGE_URL + fileName}
        onError={onError}
      /> */}
    </>
  );
};

export default DocumentViewerComponent;
