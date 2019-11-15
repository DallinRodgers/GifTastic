let topics = [
  "dog",
  "cat",
  "fish",
  "cow",
  "chicken",
  "goat",
  "snake",
  "bird",
  "hawk"
];

const newTopic = document.querySelector("#newBtn");
const search = document.querySelector("#search");
const buttons = document.querySelector(".buttons");
const giphs = document.querySelector("#giphs");
let button = document.querySelectorAll(".button");

search.addEventListener("click", () => {
  if (newTopic.value !== "") {
    getNewValue();
  }
});

document.addEventListener("keyup", e => {
  if (e.keyCode === 13 && newTopic.value !== "" && newTopic.value !== " ") {
    getNewValue();
  }
});

function getNewValue() {
  const newValue = newTopic.value;
  topics.push(newValue);
  newTopic.value = " ";
  removeBtns();
  createBtns(topics);
}

function removeBtns() {
  for (let i = 0; i < button.length; i++) {
    button[i].remove();
  }
}

function createBtns(array) {
  for (let i = 0; i < array.length; i++) {
    let btn = document.createElement("div");
    btn.setAttribute("class", "button");
    btn.innerHTML = array[i];
    buttons.append(btn);
  }
  button = document.querySelectorAll(".button");
  addListeners(button);
}

function addListeners(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", function() {
      clearGiphs();
      getGiphy(topics[i]);
    });
  }
}
function clearGiphs() {
  const clearArray = document.querySelectorAll(".giph");
  for (let i = 0; i < clearArray.length; i++) {
    clearArray[i].remove();
  }
}

createBtns(topics);

function getGiphy(subject) {
  //   This error is prevented when you use https://cors-anywhere.herokuapp.com/
  // Access to fetch at has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=OLXBqiRTp41fGqAd42KwrJtbhuKQIhYJ&q=${subject}&limit=10&offset=0&rating=G&lang=en`
  )
    .then(result => {
      // body: ReadableStream, this is found in the returned results from the api
      // This will return a promise and convert it from json to javascript
      return result.json();
    })
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        // This is a still giph
        const giphy = data.data[i].images.original_still.url;
        // This is the running giph
        // const giphy = data.data[i].images.original.url;
        var oImg = document.createElement("img");
        oImg.setAttribute("src", giphy);
        oImg.setAttribute("alt", `This is a ${subject} Giphy`);
        oImg.setAttribute("class", "giph");
        giphs.appendChild(oImg);
        //   console.log(giphy);
      }
    })
    .catch(error => console.log(error));
}
