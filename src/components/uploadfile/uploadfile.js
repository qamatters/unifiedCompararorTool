import React, { useState } from "react";
import styles from "./uploadfile.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
//import LoadingSpinner from "../loading-spinner/loading-spinner";
import checkdif from "../../images/DiffImage.gif";

import success from "../../images/success.png";
import checkcorrect from "../../images/checkcorrect.gif";
//import readfile from "../../images/readfile.gif";
import docscan from "../../images/docscan.gif";
import Carousel from "react-bootstrap/Carousel";
import Toastmessage from "../toastmessage/toastmessage";
//import Multiplefileupload from "../multiplefileupload/multiplefileupload";

const Uploadfile = (props) => {
  // const [selectedFile1, setSelectedFile1] = useState(null);
  //const [selectedFile2, setSelectedFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showsuccess, setShowSuccess] = useState(false);
  const [showalert1, setShowalert1] = useState(false);
  const [showalert2, setShowalert2] = useState(false);
  const [files, setFiles] = useState([]);
  let toastmessage =
    props.newSummaryFile.length > 1
      ? "There are new Files created in Summary folder."
      : "There are no differences between the uploaded files";
  const onChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };
  const onSubmit = async (e, path) => {
    e.preventDefault();
    console.log("path====", path);
    const formData = new FormData();
    // formData.append("destinationpath", "Prod");
    Object.values(files).forEach((file) => {
      formData.append("uploadImages", file);
    });

    try {
      const res = await axios.post(
        "http://localhost:8080/api/upload?id=" + path,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      props.listFileIndir();
      if (path === "Prod") {
        setShowalert2(true);
      } else if (path === "Stage") {
        setShowalert1(true);
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  /*  const onFileChange1 = (event) => {
    //this.setState({ selectedFile1: event.target.files[0] });
    setSelectedFile1(event.target.files[0]);
  };

  const onFileUpload1 = () => {
    const formData = new FormData();
    formData.append("myFile1", selectedFile1);

    // console.log(this.state.selectedFile1);
    axios
      .post("http://localhost:8080/api/uploadfile1", formData)
      .then((response) => {
        console.log("File 1 uploaded");
        setShowalert1(true);

        console.log(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  };
  const onFileChange2 = (event) => {
    //this.setState({ selectedFile2: event.target.files[0] });
    setSelectedFile2(event.target.files[0]);
  };

  const onFileUpload2 = () => {
    const formData = new FormData();
    formData.append("myFile2", selectedFile2);

    //console.log(this.state.selectedFile2);
    axios
      .post("http://localhost:8080/api/uploadfile2", formData)
      .then((response) => {
        console.log("File 2 uploaded");
        setShowalert2(true);
        console.log(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  };
 */
  const generateCompareFile = () => {
    console.log("compare call");
    setLoading(true);
    axios
      .get("http://localhost:8080/api/compare")
      .then((response) => {
        console.log(response.data);

        setLoading(false);
        setShowSuccess(true);
        props.listFileIndir();
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className={styles.Uploadfile} data-testid="Uploadfile">
        <Form onSubmit={(event) => onSubmit(event, "Stage")}>
          <Form.Text className="text-muted" size="sm">
            Select File to be uploaded
          </Form.Text>
          <Form.Group className="mb-3" controlId="formFileUpload1">
            <InputGroup>
              {/* <Form.Label>Upload Document 1</Form.Label> */}
              Stage Folder :
              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                multiple
                onChange={onChange}
              />
              <Button
                variant="primary"
                size="sm"
                type="submit"
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
          </Form.Group>
        </Form>
        <Form onSubmit={(event) => onSubmit(event, "Prod")}>
          <Form.Group className="mb-3" controlId="formFileUpload2">
            <InputGroup>
              {/* <Form.Label>Upload Document 2</Form.Label> */}
              Prod Folder :
              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                multiple
                onChange={onChange}
              />
              <Button
                variant="primary"
                size="sm"
                type="submit"
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
            {/*  <Carousel.Item interval={500}>
              <img
                // className="d-block w-100"
                src={readfile}
                alt="Second slide"
                className={styles.loadingicon}
              />
            </Carousel.Item> */}
            <Carousel.Item interval={500}>
              <img
                // className="d-block w-100"
                src={docscan}
                alt="Second slide"
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
            className={styles.loadingicon}
            alt="success"
          ></img>
          <Toastmessage message={toastmessage}></Toastmessage>
        </>
      ) : null}

      {props.newSummaryFile.length > 1 && showsuccess ? (
        <span></span>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Uploadfile;
