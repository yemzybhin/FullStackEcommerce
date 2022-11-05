const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
require("./db");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");

  next();
});


app.use("/api/v1/", productRoute);
app.use("/api/v1/user", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

app.listen(PORT, ()=>{
  console.log(`App is running on port http://localhost:${PORT}`)
})
