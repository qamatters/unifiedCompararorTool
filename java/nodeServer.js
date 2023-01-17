const express = require("express");
const { exec } = require("child_process");
var cors = require("cors");
const app = express();

const multer = require("multer");
const { stdout } = require("process");

// setup multer for file upload
var storage1 = multer.diskStorage({
  //destination: "./build/STAGE",
  destination: "./java/files/Stage",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var storage2 = multer.diskStorage({
  //destination: "./build/PROD",
  destination: "./java/files/Prod",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload1 = multer({ storage: storage1 });
const upload2 = multer({ storage: storage2 });
app.use(express.json());
// serving front end build files
app.use(express.static(__dirname + "/../build"));

var whitelist = ["http://localhost:3000"]; //white list consumers
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (whitelist.indexOf(origin) === -1) {
        var msg = "cors issue";

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  })
);

app.post("/api/uploadfile1", upload1.single("myFile1"), (req, res, next) => {
  console.log(req.file.originalname + " file 1  successfully uploaded !!");
  res.sendStatus(200);
});
app.post("/api/uploadfile2", upload2.single("myFile2"), (req, res, next) => {
  console.log(req.file.originalname + " file 2 successfully uploaded !!");
  res.sendStatus(200);
});
app.get("/api/test", (req, res, next) => {
  //console.log(req.file.originalname + " file successfully uploaded !!");
  res.send("hii");
  res.sendStatus(200);
});
app.get("/api/compare", (req, res, next) => {
  console.log(" Comparing ....");
  // const childProcess = exec(Exec_Command, function (err, stdout, stderr) {
  const childProcess = exec(
    "java -jar pdfCompare.jar",
    function (err, stdout, stderr) {
      console.log("inside the jar file");
      if (err) {
        console.log(err);
      }
      console.log(stdout);
    }
  );
  res.send("hii");
  //res.send(stdout);
  res.sendStatus(200);
});

//app.listen(8080, () => console.log("Listening on port 8080"));
app.listen(process.env.PORT || 8080, () =>
  console.log("Listening on port 8080", process.env.PORT || 8080)
);
