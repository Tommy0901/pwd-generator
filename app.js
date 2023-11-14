const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const generatePassword = require("./utils/generatePassword");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/result", (req, res) => {
  let option = req.body;
  let password = generatePassword(option)
  let result = `
  <div class="row">
    <div class="col-sm-4 d-flex justify-content-end">
      <label for="generated-pw" class="col-form-label">Your Password:</label>
    </div>
    <div class="col-sm-7">
      <input type="text" value='${password}' class="copy-area" id="generated-pw">
      <div class="copy-msg" class="form-text">Password copied!</div>
    </div>
    <div class="col-sm-1">
      <button type="reset" onclick="copy()" class="btn btn-primary copy-btn" >Copy</button>
    </div>
  </div>
  `;

  // 密碼錯誤處理
  if (password < 2) {
    !password
      ? result = `
      <div class="form-text invalidOpt-msg">
        Please select at least one option.
      </div>
      `
      : result = `
      <div class="form-text invalidOpt-msg">
        There is no room for validated characters.
      </div>
      `;
  }
  res.render("index", { result, option });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`); // http://127.0.0.1:3000
});
