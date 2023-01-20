import React from "react";

//import styles from "./pdfviewer.module.css";

//import { Document, Page } from "react-pdf";

function Pdfviewer(props) {
  /* const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  } */
  console.log("===", props);
  return (
    /*   <div className={styles.Pdfviewer} data-testid="Pdfviewer">
      <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div> */
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

export default Pdfviewer;
