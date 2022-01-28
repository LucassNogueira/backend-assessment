const express = require("express");
const cors = require("cors");

const app = express();

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
  const fortunes = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A dubious friend may be an enemy in camouflage.",
    "A hunch is creativity trying to tell you something.",
    "A hunch is creativity trying to tell you something.",
    "A golden egg of opportunity falls into your lap this month.",
    "Distance yourself from the vain.",
    "First think of what you want to do; then do what you have to do.",
    "How you look depends on where you go.",
    "Let the world be filled with tranquility and goodwill.",
    "Pennies from heaven find their way to your doorstep this year!",
    "Now is the time to try something new",
  ];

  let randomFtn = Math.floor(Math.random() * fortunes.length);
  let sendFortune = fortunes[randomFtn];

  res.status(200).send(sendFortune);
});

let todoListArr = [];
app.post("/todo", (req, res) => {
  console.log("hti");
  const { todo } = res.body;
  todoListArr.push(todo);
  console.log(todo);
  res.status(200).send(todoListArr);
});

app.listen(4000, () => console.log("Server running on 4000"));
