import { contentSelectionList } from "./fileHandler.js";

const jobManagement = await framework.load("jobManagement.js");
const meta = await framework.load("meta.js");
while (!(await meta.auth(cookie.pwd))) cookie.pwd = prompt("Password");

const title = document.getElementById("title");
const subreddit = document.getElementById("subreddit");
const author = document.getElementById("author");
const link = document.getElementById("link");

const inject = document.getElementById("inject");

inject.addEventListener("click", async () => {
  let data = {
    title: title.component.value,
    subreddit: subreddit.component.value,
    author: author.component.value,
    link: link.component.value,
  };

  let id = await jobManagement.createJob(cookie.pwd, data);
  cookie.id = id;
  for (let content of contentSelectionList) {
    await content.inputInstance.upload();
  }
  await jobManagement.finishJob(cookie.pwd, id);
});
