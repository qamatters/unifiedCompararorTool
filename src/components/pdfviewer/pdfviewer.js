import React from "react";

//import styles from "./pdfviewer.module.css";

//import { Document, Page } from "react-pdf";
/* 
function Pdfviewer(props) {
 
  console.log("===", props);
  return (
   
    <div>
      <object
        data={props.file}
        width="800"
        height="500"
        aria-label="pdf file"
      ></object>
    </div>
  );
}

export default Pdfviewer; */

import DocViewer, { PDFRenderer } from "react-doc-viewer";

function Pdfviewer(props) {
  const docs = [{ uri: props.file }];

  return (
    <DocViewer pluginRenderers={[PDFRenderer]}  documents={docs} />
  );
}
export default Pdfviewer;
