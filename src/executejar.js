//const exec = require("child_process").exec;
const { exec } = require("child_process");
export const jarExecute = () => {
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
  return childProcess;
};

export default jarExecute;
//export default childProcess;
