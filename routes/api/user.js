// http://localhost:3001/api/user
router.get("/", (req, res) => {
  res.json({
    name: "John",
    age: 30,
    hobbies: ["sports", "movies", "music"],
  });
});

let dataArr = [];

router.get("/get-all-users", (req, res) => {
  res.json(dataArr);
});
// http://localhost:3001/api/add-new-user
router.post("/add-new-user", (req, res) => {
  console.log(req.body);
  dataArr = [...dataArr, req.body];
  res.json({ msg: "User added successfully" });
});
