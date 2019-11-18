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

// Event listener for clicking search button
search.addEventListener("click", () => {
  if (newTopic.value !== "" && newTopic.value !== " ") {
    getNewValue();
  }
});

// Event listener for enter key
document.addEventListener("keyup", e => {
  if (e.keyCode === 13 && newTopic.value !== "" && newTopic.value !== " ") {
    getNewValue();
  }
});

// Get value from input and add it to topics array
function getNewValue() {
  const newValue = newTopic.value;
  topics.push(newValue);
  newTopic.value = "";
  removeBtns();
  createBtns(topics);
}

// Remove all buttons
function removeBtns() {
  for (let i = 0; i < button.length; i++) {
    button[i].remove();
  }
}

// Create new buttons for each item in the topics array
function createBtns(array) {
  for (let i = 0; i < array.length; i++) {
    let btn = document.createElement("a");
    btn.setAttribute("class", "button");
    btn.innerHTML = array[i];
    buttons.append(btn);
  }
  button = document.querySelectorAll(".button");
  addListeners(button, "btn");
}

// Remove all giphs
function clearGiphs() {
  const clearArray = document.querySelectorAll(".giphDiv");
  for (let i = 0; i < clearArray.length; i++) {
    clearArray[i].remove();
  }
}

createBtns(topics);

// Get new giphs from GIPHY API for the given topic
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
      const giphsArray = data.data;
      for (let i = 0; i < data.data.length; i++) {
        // This is a still giph
        const rating = giphsArray[i].rating;
        // const giphy = giphsArray[i].images.original_still.url;
        // This is the running giph
        const giphy = data.data[i].images.original.url;
        var oImg = document.createElement("img");
        oImg.setAttribute("src", giphy);
        oImg.setAttribute("alt", `This is a ${subject} Giphy`);
        oImg.setAttribute("class", "giph still");
        // oImg.innerHTML = `<img src=${giphy} alt="This is a ${subject} Giphy" class="giph still"`;
        const giphDIV = document.createElement("div");
        giphDIV.setAttribute("class", "giphDiv");
        giphDIV.innerHTML = `<p class='rating'>Rating: ${rating}<p>`;
        // giphs.appendChild(oImg);
        giphs.appendChild(giphDIV);
        giphDIV.appendChild(oImg);
      }
      addListeners(giphsArray, "giph");
    })
    .catch(error => console.log(error));
}

// Add event listeners for each new button
function addListeners(array, item) {
  if (item === "btn") {
    for (let i = 0; i < array.length; i++) {
      array[i].addEventListener("click", function() {
        clearGiphs();
        getGiphy(topics[i]);
      });
    }
  } else if (item === "giph") {
    console.log(array);
    // add event listeners to giphs
    // for (let i = 0; i < giphArray.length; i++) {
    // check class list
    // If still remove still and add playing
    // update src to correct url
    // this.setAttribute("src", giphy);
    // }
    for (let i = 0; i < array.length; i++) {
      array[i].addEventListener("click", function() {
        console.log("you clicked a giph");
      });
    }
  }
}
