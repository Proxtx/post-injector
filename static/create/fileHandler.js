import { ContentInput } from "./content.js";
import { reset } from "./dataDisplay.js";

let fileInput = document.getElementById("fileInput");
let deleteSelection = document.getElementById("delete");

let addContentSelection = document.getElementById("addContentSelection");
let handleBar = document.getElementById("contentSelectionBar");
let contentSelectionTemplate = document.getElementById("contentSelection");

let activeContentSelection;
export let contentSelectionList = [];

const createContentSelection = () => {
  let template = contentSelectionTemplate.cloneNode(true);
  let inputInstance = new ContentInput(fileInput);
  let obj = {
    template,
    inputInstance,
  };
  contentSelectionList.push(obj);
  handleBar.appendChild(template);
  template.addEventListener("click", () => {
    if (activeContentSelection)
      activeContentSelection.template.className = "contentSelection";
    template.className = "contentSelection activeContentSelection";
    activeContentSelection = obj;
    obj.inputInstance.display();
  });

  template.click();
};

fileInput.addEventListener("change", () => {
  if (activeContentSelection) activeContentSelection.inputInstance.activate();
  activeContentSelection.inputInstance.upload();
});

deleteSelection.addEventListener("click", () => {
  if (!activeContentSelection) return;
  handleBar.removeChild(activeContentSelection.template);
  contentSelectionList.splice(
    contentSelectionList.indexOf(activeContentSelection),
    1
  );
  reset();
  activeContentSelection = null;
});

addContentSelection.addEventListener("click", () => {
  createContentSelection();
});

createContentSelection();
