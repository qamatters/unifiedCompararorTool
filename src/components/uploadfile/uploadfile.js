import React, { Component } from "react";
import styles from "./uploadfile.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
class Uploadfile extends Component {
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
    axios.post("http://localhost:8080/api/uploadfile1", formData);
  };
  onFileChange2 = (event) => {
    this.setState({ selectedFile2: event.target.files[0] });
  };

  onFileUpload2 = () => {
    const formData = new FormData();
    formData.append("myFile2", this.state.selectedFile2);

    console.log(this.state.selectedFile2);
    axios.post("http://localhost:8080/api/uploadfile2", formData);
  };

  generateCompareFile = () => {
    axios.get("http://localhost:8080/api/compare").then((response) => {
      console.log(response.data);
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
              {/* <Form.Label>Upload Document 1</Form.Label> */}
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
              {/* <Form.Label>Upload Document 2</Form.Label> */}
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
              type="submit"
            >
              Compare
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Uploadfile;
