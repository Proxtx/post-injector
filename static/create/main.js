import { contentSelectionList } from "./fileHandler.js";

const jobManagement = await framework.load("jobManagement.js");
const meta = await framework.load("meta.js");
while (!(await meta.auth(cookie.pwd))) cookie.pwd = prompt("Password");

const title = document.getElementById("title");
const subreddit = document.getElementById("subreddit");
const author = document.getElementById("author");
const link = document.getElementById("link");
const mainBox = document.getElementById("mainBox");

const inject = document.getElementById("inject");

inject.addEventListener("click", async () => {
  mainBox.style.pointerEvents = "none";
  mainBox.style.opacity = "0.8";

  let data = {
    title: title.component.value,
    subreddit: subreddit.component.value,
    author: author.component.value,
    link: link.component.value,
  };

  let id = await jobManagement.createJob(cookie.pwd, data);
  cookie.id = id;
  for (let content of contentSelectionList) {
    try {
      await content.inputInstance.upload();
    } catch {
      alert("error");
      return;
    }
  }
  await jobManagement.finishJob(cookie.pwd, id);

  location.pathname = location.pathname;
});
