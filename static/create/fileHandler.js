import { ImageInput } from "./image.js";

let fileInput = document.getElementById("fileInput");
let imgOutput = document.getElementById("mainImage");
let deleteImage = document.getElementById("delete");

let addImageSelection = document.getElementById("addImageSelection");
let handleBar = document.getElementById("imageSelectionBar");
let imageSelectionTemplate = document.getElementById("imageSelection");

let activeImageSelection;
export let imageSelectionList = [];

const createImageSelection = () => {
  let template = imageSelectionTemplate.cloneNode(true);
  let inputInstance = new ImageInput(fileInput, imgOutput);
  let obj = {
    template,
    inputInstance,
  };
  imageSelectionList.push(obj);
  handleBar.appendChild(template);
  template.addEventListener("click", () => {
    if (activeImageSelection)
      activeImageSelection.template.className = "imageSelection";
    template.className = "imageSelection activeImageSelection";
    activeImageSelection = obj;
    obj.inputInstance.display();
  });

  template.click();
};

fileInput.addEventListener("change", () => {
  if (activeImageSelection) activeImageSelection.inputInstance.activate();
});

deleteImage.addEventListener("click", () => {
  if (!activeImageSelection) return;
  handleBar.removeChild(activeImageSelection.template);
  imageSelectionList.splice(
    imageSelectionList.indexOf(activeImageSelection),
    1
  );
  imgOutput.src = "../lib/notSet.png";
});

addImageSelection.addEventListener("click", () => {
  createImageSelection();
});

createImageSelection();
