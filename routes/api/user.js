const express = require("express");
const router = express.Router();

let dataArr = [];

// http://localhost:3001/api/user
router.get("/", (req, res) => {
  res.json({
    name: "John",
    age: 30,
    hobbies: ["sports", "movies", "music"],
  });
});
// http://localhost:3001/api/user/get-all-users
router.get("/get-all-users", (req, res) => {
  res.json(dataArr);
});
// http://localhost:3001/api/user/add-new-user
router.post("/add-new-user", (req, res) => {
  console.log(req.body);
  dataArr = [...dataArr, req.body];
  res.json({ msg: "User added successfully" });
});

module.exports = router;
