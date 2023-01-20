const express = require("express");
const { exec } = require("child_process");
var cors = require("cors");
const app = express();

const multer = require("multer");
const { stdout } = require("process");

var fs = require("fs");

var path = require("path");

// setup multer for file upload
var storage1 = multer.diskStorage({
  //destination: "./build/STAGE",
  destination: "./files/Stage",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var storage2 = multer.diskStorage({
  //destination: "./build/PROD",
  destination: "./files/Prod",
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

app.get("/api/listfiles", (req, res, next) => {
  console.log("inside the listfiles");

  try {
    let dirents = fs.readdirSync("./files/Stage/", { withFileTypes: true });
    let stagefilenames = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    console.log("new files stage", stagefilenames);
    let dirents1 = fs.readdirSync("./files/Prod/", { withFileTypes: true });
    let prodfilenames = dirents1
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    console.log("new files prod", prodfilenames);
    let dirents2 = fs.readdirSync("./files/Summary/", { withFileTypes: true });
    let summaryfilenames = dirents2
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    console.log("new files summaryfilenames", summaryfilenames);

    res.status(200).json({
      stagefilenames: stagefilenames,
      prodfilenames: prodfilenames,
      summaryfilenames: summaryfilenames,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/api/compare", (req, res, next) => {
  console.log(" Comparing ....");

  const childProcess = exec(
    "java -jar pdfCompare.jar",
    function (err, stdout, stderr) {
      console.log("inside the jar file");
      if (err) {
        console.log(err);
      }
      //console.log(stdout);
      const smartcontract = stdout.toString().substring(30, 72);
      console.log(smartcontract);
      console.log("stdout ===", stdout);
      //res.send(smartcontract);
      if (stdout != null) {
        res.sendStatus(200);
      }
    }
  );
});

app.listen(process.env.PORT || 8080, () =>
  console.log("Listening on port 8080", process.env.PORT || 8080)
);
