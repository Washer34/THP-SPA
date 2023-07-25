import "./style/index.scss";
import * as bootstrap from "bootstrap";
import routes from "./scripts/routes.js";
import PageList from "./scripts/PageList.js";


const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split("/");

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || "";
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener("hashchange", () => callRoute());
window.addEventListener("DOMContentLoaded", () => callRoute());

// search 


const inputText = document.getElementById('inputText');
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const userInput = inputText.value;
  console.log(userInput)
  PageList(userInput);
})
 