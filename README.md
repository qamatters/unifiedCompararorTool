1. Run command cd java: PS C:\Users\deepak.mathpal\Documents\pdfComparator> cd java
2. When you are inside java folder, run node server:
PS C:\Users\deepak.mathpal\Documents\pdfComparator\java> node nodeServer.js
 Listening on port 8080 8080
4. If port is occupied then, open powershell with admin rights and stop the process which is running on 8080 byfollowing 2 commands:
Get the process:
netstat -ano | findstr :8080
Stop the process
stop-process 82932
5. Now inside project folder , run command:  npm start
PS C:\Users\deepak.mathpal\Documents\pdfComparator> npm start
12. To test the jar run, java -jar pdfCompare.jar