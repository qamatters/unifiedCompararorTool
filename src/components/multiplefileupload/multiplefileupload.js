import axios from "axios";
import React, { Fragment, useState } from "react";
//import styles from "./multiplefileupload.module.css";

const Multiplefileupload = (props) => /* (
  <div className={styles.Multiplefileupload} data-testid="Multiplefileupload">
    Multiplefileupload Component
  </div>
); */ {
  const [files, setFiles] = useState([]);
  const [filesProd, setFilesprod] = useState([]);

  const onChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };
  const onChangeProd = (e) => {
    console.log(e.target.files);
    setFilesprod(e.target.files);
  };
  console.log(files);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("uploadImages", file);
    });
    formData.append("destinationpath", props.path);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  const onSubmitProd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(filesProd).forEach((file) => {
      formData.append("uploadImagesProd", file);
    });
    console.log(formData.get("uploadImagesProd"));
    try {
      const res = await axios.post(
        "http://localhost:8080/api/uploadProd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      <form onSubmit={props.path === "Stage" ? onSubmit : onSubmitProd}>
        <div>
          <input
            type="file"
            id="file"
            name={props.path === "Stage" ? "uploadImages" : "uploadImagesProd"}
            multiple
            onChange={props.path === "Stage" ? onChange : onChangeProd}
          />
        </div>
        <input type="submit" value="Upload" />
      </form>
    </Fragment>
  );
};

Multiplefileupload.propTypes = {};

Multiplefileupload.defaultProps = {};

export default Multiplefileupload;
