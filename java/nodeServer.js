const express = require("express");
const { exec } = require("child_process");
var cors = require("cors");
const app = express();

const multer = require("multer");
const { stdout } = require("process");

var fs = require("fs");

var path = require("path");

app.use(express.json());
// serving front end build files
app.use(express.static(__dirname + "/../build"));

var whitelist = ["http://localhost:3000","http://localhost:3001" ]; //white list consumers
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
// var bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: "50mb" }));
// // app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     extended: true,
//     parameterLimit: 100000,
//     limit: "50mb",
//   })
// );

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

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
    console.log("dirents2", dirents2);
    let summaryfilenames = dirents2
      .filter((dirent) => dirent.isFile())
      .map(
        (dirent) => dirent.name /* {
        const stats = fs.statSync("./files/Summary/" + dirent.name);
        var filename = dirent.name + "-" + stats.mtime;
        return filename;
      } */
      );
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

/**
 * This is to compare the files in the stage and prod folder.
 */
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


app.get("/api/getPdf", function (req, res) {
  console.log("./files/" + req.query.path);
  //res.download("./files/Summary/sample.pdf");
  res.download("./files/" + req.query.path);
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("storage *******req.", req.query.id);
    var userId = req.query.id;

    if (userId == "Prod") {
      cb(null, path.join(__dirname, "./files/Prod"));
    } else if (userId == "Stage") {
      cb(null, path.join(__dirname, "./files/Stage"));
    } else {
      cb(null, path.join(__dirname, "./files"));
    }
  },
  filename: function (req, file, cb) {
    //console.log("storage *******", req, file, cb);
    cb(
      null,
      //file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
      file.originalname
    );
  },
});

const multi_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "text/plain"|| file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) {
      console.log("multi_upload fileFilter == req.files,file", req.files, file);
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .pdf/.txt/.xlsx docs are supported!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("uploadImages", 40);

app.post("/api/upload", (req, res) => {
  multi_upload(req, res, function (err) {
    //  console.log("multi_upload == res ", res);
    //multer error
    if (err instanceof multer.MulterError) {
      console.log(err);
      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    res.status(200).send("file uploaded");
  });
});

app.listen(process.env.PORT || 8080, () =>
  console.log("Listening on port 8080", process.env.PORT || 8080)
);
