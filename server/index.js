const express = require("express");
const { exec } = require("child_process");
var cors = require("cors");
const app = express();

const multer = require("multer");

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
/* var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};

app.use(cors(corsOptions)); */
/* const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions)); */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin

      // (like mobile apps or curl requests)

      if (!origin) return callback(null, true);

      if (whitelist.indexOf(origin) === -1) {
        var msg = "cors issue";

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  })
);

/* app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
}); */

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
  //console.log(req.file.originalname + " file successfully uploaded !!");
  const childProcess = exec(
    'java -jar  C:\\Users\\janani.a.sridharOneDrive - Accenture\\PDFCompare\\react-file-uplaod-main\\react-file-uplaod-main\\java\\pdfCompare.jar  "Jar is invoked by Node js"',
    function (err, stdout, stderr) {
      console.log("inside the jar file");
      if (err) {
        console.log(err);
      }
      console.log(stdout);
    }
  );
  res.send("hii");
  res.sendStatus(200);
});

/* app.post(
  "/api/uploadfile",
  upload.single("myFile"),
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url

    changeOrigin: true,

    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";

      console.log(req.file.originalname + " file successfully uploaded !!");

      proxyRes.sendStatus(200);
    },
  })
); */

//app.listen(8080, () => console.log("Listening on port 8080"));
app.listen(process.env.PORT || 8080, () =>
  console.log("Listening on port 8080", process.env.PORT || 8080)
);
