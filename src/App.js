import React, { Component } from "react";
import axios from "axios";
import "./App.css";
//import childProcess from "./executejar";
//const exec = require("child_process").exec;
//import jarExecute from "./executejar";
const { exec } = require("child_process");
class FileUpload extends Component {
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

  /* fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }; */

  render() {
    return (
      <div>
        <h1>PDF compare</h1>
        <div>
          <input type="file" onChange={this.onFileChange1} />
          <button onClick={this.onFileUpload1}>Upload Doc1!</button>
          <input type="file" onChange={this.onFileChange2} />
          <button onClick={this.onFileUpload2}>Upload Doc2!</button>
          <button onClick={this.generateCompareFile}>Compare</button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
