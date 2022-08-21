const img = document.getElementById("mainImage");
const vid = document.getElementById("mainVideo");

export const reset = () => {
  img.style.display = "unset";
  vid.style.display = "hidden";
  img.src = "../lib/notSet.png";
};

export const setFromUrl = async (file) => {
  let url;
  try {
    url = URL.createObjectURL(file);
  } catch {
    return;
  }
  if (file.type.split("/")[0] == "image") {
    img.src = url;
    img.style.display = "unset";
    vid.style.display = "none";
  } else {
    vid.src = url;
    vid.style.display = "unset";
    img.style.display = "none";
  }
};
