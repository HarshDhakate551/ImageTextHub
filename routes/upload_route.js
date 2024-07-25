const express = require("express");
const render = express.Router();
const multer = require("multer");
const path = require("node:path");

const { Quote, Counter } = require("../script");
const t = require("tesseract.js");

// defining multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
   const resolvedPath = path.resolve(__dirname, "..");
    console.log(resolvedPath);
    const newpath = path.join(resolvedPath, "/uploads/");
    callback(null, newpath);
  },
  filename: function (req, file, callback) {
    // const uniqueSuffix = Date.now() + path.extname(file.originalname);
    const uniqueSuffix = Date.now();
    callback(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const upload = multer({ storage: storage });

async function PutData(filename) {
  console.log(__dirname);
  let resolvePath = path.resolve(__dirname, "..");
  console.log(resolvePath);
  let newpath = `${resolvePath}/uploads/` + `${filename}`;
  await t
    .recognize(path, "eng" /*{logger: e => console.log(e)}*/)
    // t.recognize to innitiate the module where we pass image , the language , logger(optional)
    .then(async (out) => {
      // console.log(out);
      const value = out.data.text;
      // console.log(value)

      await Counter.findOneAndUpdate(
        { _id: "665338cee0e36ff7e7b9958b" },
        { $inc: { counter: 1 } },
        { new: true, upsert: true }
        // new makes an new object , upsert makes the default is not true else it would prevent extra creation
      );
      let count = await Counter.findById("665338cee0e36ff7e7b9958b");
      let Counter_No = count.counter;

      const data = new Quote({ SrNo: Counter_No, quote: value });
      await data.save();
      console.log(`data Saved Successfully \n${data}`);
    });
}

// it's add data to database
render.post("/upload", upload.single("file"), async (req, resp) => {
  console.log(req.file);
  console.log(req.file.filename);
  const filename = req.file.filename;
  let data = await PutData(filename);
  resp.render("Upload/upload_feedback.ejs");
});

render.get("/upload", (req, resp) => {
  resp.render("Upload/upload_form");
});

module.exports = render;

/*
const t = require("tesseract.js")
const out = t.recognize("./Screenshot 2024-04-16 203547.png",'eng', {logger: e => console.log(e)})
console.log(out);
iska output diffrent hoga cause yaha promise solve hone se pehle he data save ho raha hai
*/
