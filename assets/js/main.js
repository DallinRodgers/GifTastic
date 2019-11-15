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

search.addEventListener("click", () => {
  getNewValue();
});

document.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
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
  const button = document.querySelectorAll(".button");
  console.log(button);
  for (let i = 0; i < button.length; i++) {
    button[i].remove();
  }
}

// function getNewTopic(){

// }

function createBtns(array) {
  for (let i = 0; i < array.length; i++) {
    let btn = document.createElement("div");
    btn.setAttribute("class", "button");
    btn.innerHTML = array[i];
    buttons.append(btn);
  }
}

createBtns(topics);

// function getGiphy(subject) {
//   //   This error is prevented when you use https://cors-anywhere.herokuapp.com/
//   // Access to fetch at has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
//   fetch(
//     `https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=OLXBqiRTp41fGqAd42KwrJtbhuKQIhYJ&q=${subject}&limit=1&offset=0&rating=G&lang=en`
//   )
//     .then(result => {
//       // body: ReadableStream, this is found in the returned results from the api
//       // This will return a promise and convert it from json to javascript
//       return result.json();
//     })
//     .then(data => {
//       console.log(data);
//       // This is a still giph
//         const giphy = data.data[0].images.original_still.url;
//       // This is the running giph
//     //   const giphy = data.data[0].images.original.url;
//       var oImg = document.createElement("img");
//       oImg.setAttribute("src", giphy);
//       oImg.setAttribute("alt", `This is a ${subject} Giphy`);
//       document.body.appendChild(oImg);
//       console.log(giphy);
//     })
//     .catch(error => console.log(error));
// }

// getGiphy("dog");
// getGiphy("cat");
// getGiphy("funny");
