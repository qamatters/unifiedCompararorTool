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
import readfile from "../../images/readfile.gif";
import docscan from "../../images/docscan.gif";
import Carousel from "react-bootstrap/Carousel";

const Uploadfile = () => {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showsuccess, setShowSuccess] = useState(false);
  const [showalert1, setShowalert1] = useState(false);
  const [showalert2, setShowalert2] = useState(false);
  const onFileChange1 = (event) => {
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

  const generateCompareFile = () => {
    console.log("compare call");
    setLoading(true);
    axios
      .get("http://localhost:8080/api/compare")
      .then((response) => {
        console.log(response.data);

        setLoading(false);
        setShowSuccess(true);
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
        <Form>
          <Form.Text className="text-muted" size="sm">
            Select File to be uploaded
          </Form.Text>
          <Form.Group className="mb-3" controlId="formFileUpload1">
            <InputGroup>
              {/* <Form.Label>Upload Document 1</Form.Label> */}
              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                onChange={(event) => onFileChange1(event)}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => onFileUpload1()}
              >
                Upload Doc1
              </Button>
              {showalert1 ? (
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

          <Form.Group className="mb-3" controlId="formFileUpload2">
            <InputGroup>
              {/* <Form.Label>Upload Document 2</Form.Label> */}
              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                onChange={(event) => onFileChange2(event)}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => onFileUpload2()}
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
        <img
          src={checkcorrect}
          className={styles.loadingicon}
          alt="success"
        ></img>
      ) : null}
    </>
  );
};
/* class Uploadfile extends Component {
  state = {
    selectedFile1: null,
    selectedFile2: null,
  };

  onFileChange1 = (event) => {
    this.setState({ selectedFile1: event.target.files[0] });
  };

  onFileUpload1 = () => {
    const formData = new FormData();
    formData.append("myFile1", this.state.selectedFile1);

    console.log(this.state.selectedFile1);
    axios
      .post("http://localhost:8080/api/uploadfile1", formData)
      .then((response) => {
        console.log("File 1 uploaded");

        console.log(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  };
  onFileChange2 = (event) => {
    this.setState({ selectedFile2: event.target.files[0] });
  };

  onFileUpload2 = () => {
    const formData = new FormData();
    formData.append("myFile2", this.state.selectedFile2);

    console.log(this.state.selectedFile2);
    axios
      .post("http://localhost:8080/api/uploadfile2", formData)
      .then((response) => {
        console.log("File 2 uploaded");

        console.log(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  };

  generateCompareFile = () => {
    console.log("compare call");
    axios
      .get("http://localhost:8080/api/compare")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
       
        console.log(err);
      });
  };
  render() {
    return (
      <div className={styles.Uploadfile} data-testid="Uploadfile">
        <Form>
          <Form.Text className="text-muted" size="sm">
            Select File to be uploaded
          </Form.Text>
          <Form.Group className="mb-3" controlId="formFileUpload1">
            <InputGroup>
             
              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                onChange={this.onFileChange1}
              />

              <Button variant="primary" size="sm" onClick={this.onFileUpload1}>
                Upload Doc1
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFileUpload2">
            <InputGroup>
            
              <Form.Control
                type="file"
                size="sm"
                placeholder="Select file"
                onChange={this.onFileChange2}
              />

              <Button variant="primary" size="sm" onClick={this.onFileUpload2}>
                Upload Doc2
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="compare">
            <Button
              variant="primary"
              size="sm"
              onClick={this.generateCompareFile}
            >
              Compare
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
} */

export default Uploadfile;
