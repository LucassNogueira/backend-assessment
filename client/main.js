// fortune button info
const fortuneBtn = document.querySelector("#fortuneBtn");
const addFortuneInput = document.querySelector("#addfortuneinput");
const fortuneForm = document.querySelector("#addfortuneform");
const fortunecont = document.querySelector("#fortunecontainer");
const clearBtn = document.querySelector("#fortuneClr");
// todo list info
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todoinput");
const todoDisplay = document.querySelector("#todo-display");
//editing todo list info
const editForm = document.querySelector("#edit-todo");
const editInputNum = document.querySelector("#number-input");
const replacement = document.querySelector("#replacement");
// dog stuff
const dogBtn = document.querySelector("#dog-btn");
const dogDiv = document.querySelector("#dog-contain");
const dogPicture = document.createElement("img");
// cute dog stuff
const cuteBtn = document.querySelector("#golden");
//
//
// crypo stuff
const cryptoBtn = document.querySelector("#linkprice");
//
//
//
//

const randomFortune = () => {
  axios.get("http://localhost:4000/api/fortune").then((res) => {
    fortunecont.innerHTML = "";
    const h2 = document.createElement("h2");
    let text = document.createTextNode(`${res.data}`);
    h2.appendChild(text);
    fortunecont.appendChild(h2);
  });
};

const clearFortune = () => {
  fortunecont.innerHTML = "";
};
clearBtn.addEventListener("click", clearFortune);
fortuneBtn.addEventListener("click", randomFortune);

const finishTask = (evt) => {
  axios
    .delete(`http://localhost:4000/api/todo/${evt.target.getAttribute("id")}`)
    .then((res) => {
      const [removedEl, todoTask] = res.data;
      console.log(evt.target);
      alert(`congrats on finishing ${removedEl.task}, you killed it!`);

      printList(todoTask);
    })
    .catch((err) => console.log(err));
};

const printList = (arr) => {
  todoDisplay.innerHTML = "";

  arr.forEach((taskObj) => {
    const newLi = document.createElement("li");
    newLi.textContent = taskObj.task;
    newLi.setAttribute("id", taskObj.id);

    newLi.addEventListener("click", finishTask);

    todoDisplay.appendChild(newLi);
  });
};

const createTodo = (evt) => {
  evt.preventDefault();
  const todoText = todoInput.value;
  if (!todoText.trim()) {
    alert(`i know you've got $#!T to do! enter something!`);
    return;
  }
  axios
    .post("http://localhost:4000/api/todo", { task: todoText })
    .then((res) => {
      printList(res.data);
    })
    .catch((err) => console.log(err));
};

todoForm.addEventListener("submit", createTodo);

const submitFortune = (evt) => {
  evt.preventDefault();

  const inputFortune = addFortuneInput.value;
  axios
    .post("http://localhost:4000/api/fortune", { inputFortune })
    .then((res) => {
      const newFortune = addFortuneInput.value;
      alert(`${newFortune} was added!`);
    });
};

fortuneForm.addEventListener("submit", submitFortune);

const editTodoList = (evt) => {
  evt.preventDefault();

  const body = {
    id: editInputNum.value,
    task: replacement.value,
  };

  axios.put("http://localhost:4000/api/todo/id", body).then((res) => {
    printList(res.data);
  });
};

editForm.addEventListener("submit", editTodoList);

//dog stuff
// button variable is dogBtn
// dog div variable is dogDiv

const dogPic = (evt) => {
  evt.preventDefault();
  axios.get("https://dog.ceo/api/breeds/image/random").then((res) => {
    dogDiv.innerHTML = "";
    const dogUrl = res.data.message;
    dogPicture.src = dogUrl;
    dogDiv.appendChild(dogPicture);
    dogPicture.style.border = "5px solid black";
    dogPicture.style.borderRadius = "5px";
    dogPicture.style.width = "350px";
    dogPicture.style.height = "350px";
  });
};
// cute dog functionality
//button is cuteBtn
//div to replace is dogDiv

const goldenPic = (e) => {
  e.preventDefault();

  axios
    .get("https://dog.ceo/api/breed/retriever/golden/images/random")
    .then((res) => {
      dogDiv.innerHTML = "";
      const goldenUrl = res.data.message;
      dogPicture.src = goldenUrl;
      dogDiv.appendChild(dogPicture);
      dogPicture.style.border = "5px solid black";
      dogPicture.style.borderRadius = "5px";
      dogPicture.style.width = "350px";
      dogPicture.style.height = "350px";
    });
};

cuteBtn.addEventListener("click", goldenPic);
dogBtn.addEventListener("click", dogPic);

//
//
// crypto stuff
// button variable is cryptoBtn
const cryptoDiv = document.querySelector("#price-display");
const priceP = document.createElement("h2");
//
//

const clearDiv = () => {
  cryptoDiv.innerHTML = "";
};
const crpytoPrice = (e) => {
  e.preventDefault();
  axios.get("https://api.coinbase.com/v2/prices/LINK-USD/buy").then((res) => {
    const price = res.data.data.amount;
    if (price <= 28.769) {
      cryptoDiv.innerHTML = "";
      const goAway = document.createElement("button");
      goAway.innerHTML = "im sad, please make it go away";
      priceP.textContent = `You're down homie, LINK is $${price} per coin....you bought in at $28`;
      priceP.style.color = "red";
      cryptoDiv.appendChild(priceP);
      cryptoDiv.appendChild(goAway);
      goAway.addEventListener("click", clearDiv);
    } else {
      cryptoDiv.innerHTML = "";
      priceP.textContent = `LETS GOOOO!!! LINK is at $${price} per coin and you bought in at $28!!!`;
      priceP.style.color = "green";
      cryptoDiv.appendChild(priceP);
    }
  });
};

cryptoBtn.addEventListener("click", crpytoPrice);
