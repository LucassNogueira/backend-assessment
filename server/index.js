const express = require("express");
const cors = require("cors");

const app = express();

const fortunes = [
  "A beautiful, smart, and loving person will be coming into your life.",
  "A dubious friend may be an enemy in camouflage.",
  "A hunch is creativity trying to tell you something.",
  "A smooth long journey! Great expectations.",
  "All the effort you are making will ultimately pay off.",
  "Believe it can be done.",
];

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = [
    "Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

app.get("/api/fortune", (req, res) => {
  let randomFtn = Math.floor(Math.random() * fortunes.length);
  let sendFortune = fortunes[randomFtn];

  res.status(200).send(sendFortune);
});

let todoListArr = [];
let id = 1;
app.post("/api/todo", (req, res) => {
  const { task } = req.body;
  let newTask = {
    id,
    task,
  };

  todoListArr.push(newTask);
  id++;
  res.status(200).send(todoListArr);
});

app.delete("/api/todo/:id", (req, res) => {
  const toDeleteId = +req.params.id;
  const targetIndex = todoListArr.findIndex((taskObj) => {
    return taskObj.id === toDeleteId;
  });

  const deleting = todoListArr.splice(targetIndex, 1);
  res.status(200).send([deleting[0], todoListArr]);
});

app.post("/api/fortune", (req, res) => {
  const { inputFortune } = req.body;
  fortunes.push(inputFortune);
  res.sendStatus(200);
  console.log(fortunes);
});
//
//
//
//
//
//
app.put("/api/todo/:id", (req, res) => {
  const { id, task } = req.body;
  let targetId = Number(req.body.id);
  for (let i = 0; i < todoListArr.length; i++) {
    if (todoListArr[i].id === targetId) {
      todoListArr[i].task = task;
    }
  }
  res.status(200).send(todoListArr);
});

//
//
//

app.get("https://dog.ceo/api/breeds/image/random", (req, res) => {
  const { message, status } = req.body;
  res.send(message);
});

//
//
//

app.get(
  "https://dog.ceo/api/breed/retriever/golden/images/random",
  (req, res) => {
    const { message, status } = req.body;
    res.send(message);
  }
);

//
//
//

app.get("https://api.coinbase.com/v2/prices/:currency_pair/buy", (req, res) => {
  res.status(200).send(req.body);
});
app.listen(4000, () => console.log("Server running on 4000"));
