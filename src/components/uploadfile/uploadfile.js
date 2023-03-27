import React, { useState, useRef } from "react";
import styles from "./uploadfile.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

import checkdif from "../../images/DiffImage.gif";

import success from "../../images/success.png";
import checkcorrect from "../../images/checkcorrect.gif";

//import docscan1 from "../../images/docscan1.gif";
import Carousel from "react-bootstrap/Carousel";
import Toastmessage from "../toastmessage/toastmessage";

//import Multiplefileupload from "../multiplefileupload/multiplefileupload";

const Uploadfile = (props) => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const [loading, setLoading] = useState(false);
  const [showsuccess, setShowSuccess] = useState(false);
  const [showalert1, setShowalert1] = useState(false);
  const [showalert2, setShowalert2] = useState(false);
  const [showalert3, setShowalert3] = useState(false);
  const [showerror, setShowerror] = useState(false);
  const [stagefiles, setStageFiles] = useState([]);
  const [prodfiles, setProdFiles] = useState([]);
  const [ignoredTitlesfiles, setIgnoredTitlesFiles] = useState([]);
  const [isFileUploaded, setIsfileuploaded] = useState(true);
  let toastmessage =
    props.newSummaryFile.length >= 1
      ? "There are new Files created in Summary folder. View the files-PDFCOMPARATOR/java/files/Summary folder."
      : "There are no differences between the uploaded files.. View the files-PDFCOMPARATOR/java/files/Summary folder.";
  /**
   * Important- color of the toast message is dependent on the Error word at the begining. So error message string should start with Error word.
   *  */
  let errormessage =
    "Error ! Something went wrong.Please contact application admin";

  const FILENOTUPLOADEDMESSAGE =
    "Error ! Alert you have selected files that are not uploaded. Click on Upload button to upload the selected files";

  const onChange = (e, path) => {
    console.log(e.target.files);
    //setFiles(e.target.files);
    if (path === "Stage") {
      setStageFiles(e.target.files);
    } else if (path === "Prod") {
      setProdFiles(e.target.files);
    } else if (path === "IgnoredTitles") {
      setIgnoredTitlesFiles(e.target.files);
    }
  };
  const onSubmit = async (e, path) => {
    e.preventDefault();
    console.log("path====", path);
    console.log(stagefiles, prodfiles, ignoredTitlesfiles);
    const formData = new FormData();
    // formData.append("destinationpath", "Prod");
    if (path === "Stage") {
      Object.values(stagefiles).forEach((file) => {
        formData.append("uploadImages", file);
      });
    } else if (path === "Prod") {
      Object.values(prodfiles).forEach((file) => {
        formData.append("uploadImages", file);
      });
    } else if (path === "IgnoredTitles") {
      Object.values(ignoredTitlesfiles).forEach((file) => {
        formData.append("uploadImages", file);
      });
    }
    console.log("path is :" + path)
    try {
      const res = await axios.post(
        "http://localhost:8080/api/upload?id=" + path,formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Content-Encoding": "gzip"
          },
        }
      );
      console.log(res);
      props.listFileIndir();
      if (path === "Stage") {
        setShowalert1(true);
        setShowerror(false);
        setStageFiles([]);
        ref1.current.value = "";
        setTimeout(() => {
          setShowalert1(false);
        }, 5000);
      } else if (path === "Prod") {
        setShowalert2(true);

        setShowerror(false);
        setProdFiles([]);
        ref2.current.value = "";
        setTimeout(() => {
          setShowalert2(false);
        }, 5000);
      } else if (path === "IgnoredTitles") {
        setShowalert3(true);
        setShowerror(false);
        setIgnoredTitlesFiles([]);
        ref3.current.value = "";
        setTimeout(() => {
          setShowalert3(false);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      setShowerror(true);
    }
  };

  const generateCompareFile = () => {
    console.log("compare call");
    /* if (
      stagefiles.length > 0 ||
      prodfiles.length > 0 ||
      ignoredTitlesfiles.length > 0
    ) {
      setIsfileuploaded(false);
    } else { */
    setLoading(true);
    axios
      .get("http://localhost:8080/api/compare")
      .then((response) => {
        console.log(response.data);

        setLoading(false);
        setShowSuccess(true);
        setShowerror(false);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        props.listFileIndir();
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        setLoading(false);
        setShowerror(true);
      });
    //}
  };

  return (
    <>
      <div className={styles.Uploadfile} data-testid="Uploadfile">
        <Form onSubmit={(event) => onSubmit(event, "Stage")}>
          <Form.Label>
            <strong>Stage Folder</strong>
          </Form.Label>
          <Form.Group className="mb-3" controlId="formFileUpload1">
            <InputGroup>
              {/* <Form.Label>Upload Document 1</Form.Label> */}

              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                multiple
                accept=".pdf,.xlsx"
                onChange={(event) => onChange(event, "Stage")}
                ref={ref1}
              />
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={stagefiles && stagefiles.length > 0 ? false : true}
                // onClick={() => onFileUpload1()}
              >
                Upload Doc1
              </Button>
              {showalert1 ? (
                <p>
                  <img
                    src={success}
                    className={styles.imgicon}
                    alt="success"
                  ></img>
                </p>
              ) : null}
            </InputGroup>
            <Form.Text className="text-muted">
              <strong>Upload pdf and xlsx file to be added to Prod folder</strong>
            </Form.Text>
          </Form.Group>
        </Form>
        <Form onSubmit={(event) => onSubmit(event, "Prod")}>
          <Form.Group className="mb-3" controlId="formFileUpload2">
            <Form.Label>
              <strong>Prod Folder</strong>
            </Form.Label>
            <InputGroup>
              {/* <Form.Label>Upload Document 2</Form.Label> */}

              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                multiple
                accept=".pdf,.xlsx"
                onChange={(event) => onChange(event, "Prod")}
                ref={ref2}
              />
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={prodfiles && prodfiles.length > 0 ? false : true}
                //onClick={() => onFileUpload2()}
              >
                Upload Doc2
              </Button>
              {showalert2 ? (
                <p>
                  <img
                    src={success}
                    className={styles.imgicon}
                    alt="pdffile"
                  ></img>
                </p>
              ) : null}
            </InputGroup>
            <Form.Text className="text-muted">
              <strong>Upload pdf and xlsx file to be added to Prod folder.</strong>
            </Form.Text>
          </Form.Group>
        </Form>
        <Form onSubmit={(event) => onSubmit(event, "IgnoredTitles")}>
          <Form.Group className="mb-3" controlId="formFileUpload2">
            <Form.Label>
              {" "}
              <strong>Ignored Titles</strong>
            </Form.Label>
            <InputGroup>
              {/* <Form.Label>Upload Document 2</Form.Label> */}

              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                multiple
                accept=".txt"
                onChange={(event) => onChange(event, "IgnoredTitles")}
                ref={ref3}
              />
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={
                  ignoredTitlesfiles && ignoredTitlesfiles.length > 0
                    ? false
                    : true
                }
                //onClick={() => onFileUpload2()}
              >
                Upload Doc3
              </Button>
              {showalert3 ? (
                <p>
                  <img
                    src={success}
                    className={styles.imgicon}
                    alt="pdffile"
                  ></img>
                </p>
              ) : null}
            </InputGroup>
            <Form.Text className="text-muted">
              <strong>
                Upload text file with Titles to be ignored.
                <b>Note:File name should be IgnoredTitles.txt only. This is for pdf comparison.</b>
              </strong>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="compare">
            <Button
              variant="primary"
              size="sm"
              onClick={() => generateCompareFile()}
            >
              Compare
            </Button>
          </Form.Group>
        </Form>
      </div>
      {/* {loading ? (
        <LoadingSpinner />
      ) : (
        <h6>List of files is shown in View files tab .</h6>
      )} */}
      {/* <img
            src={checkdif}
            className={styles.loadingicon}
            alt="pdfloading"
          ></img> */}
      {loading ? (
        <div className={styles.carouselstyles}>
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                // className="d-block w-100"
                src={checkdif}
                alt="First slide"
                className={styles.loadingicon}
              />
            </Carousel.Item>

            <Carousel.Item interval={1000}>
              <img
                // className="d-block w-100"
                // src={docscan1}
                src={checkdif}
                alt="Second slide"
                // className={styles.loadingicon1}
                className={styles.loadingicon}
              />
            </Carousel.Item>
          </Carousel>
        </div>
      ) : null}
      {showsuccess ? (
        <>
          <img
            src={checkcorrect}
            className={styles.successicon}
            alt="success"
          ></img>
          <Toastmessage message={toastmessage}></Toastmessage>
        </>
      ) : null}
      {showerror ? <Toastmessage message={errormessage}></Toastmessage> : null};
      {isFileUploaded ? null : (
        <Toastmessage message={FILENOTUPLOADEDMESSAGE}></Toastmessage>
      )}
      ;
    </>
  );
};

export default Uploadfile;
