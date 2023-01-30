import React from "react";

//import DocViewer, { PDFRenderer } from "react-doc-viewer";
function Pdfviewer(props) {
  const docs = [{ uri: props.file }];
  /* return (
     <DocViewer pluginRenderers={[PDFRenderer]}  documents={docs} />
  ); */
}
export default Pdfviewer;
