const fs = require("node:fs/promises");
const filePath = "./original.md";
const copyFilePath = "./copy.md";

fs.writeFile(filePath, "This is the first content of the file.")
  .then(() => {
    console.log("File written successfully :)");
    return fs.readFile(filePath, "utf8");
  })
  .then((data) => {
    console.log("File content:", data);
    return fs.copyFile(filePath, copyFilePath);
  })
  .then(() => {
    console.log("File copied successfully as 'boy.md' :)");
    return fs.appendFile(
      copyFilePath,
      "\n\nThis is the second content of the file."
    );
  })
  .then(() => {
    console.log("Appended to 'boy.md' :)");
    return fs.unlink(filePath);
  })
  .then(() => {
    console.log("Original file deleted successfully :)");
  })
  .catch((error) => {
    console.error("Error :( ", error);
  });
