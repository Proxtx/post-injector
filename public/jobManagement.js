import { auth } from "./meta.js";
import fs from "fs/promises";
import config from "@proxtx/config";

let jobs = {};

export const getJob = (pwd, id) => {
  if (!auth(pwd)) return;
  return jobs[id];
};

export const createJob = async (pwd, data) => {
  if (!auth(pwd)) return;
  let id = Math.floor(Math.random() * 1000000);

  data.time = Date.now();
  data.downloads = [];
  data.subreddit = data.subreddit.trim().toLowerCase();

  let job = {
    data,
  };

  let path = config.downloads + "/" + data.subreddit + "/" + data.title;
  await fs.mkdir(path, { recursive: true });
  job.path = path;

  jobs[id] = job;
  return id;
};

export const finishJob = async (pwd, jobId) => {
  if (!auth(pwd)) return;
  let job = getJob(pwd, jobId);
  if (!job) return;

  await fs.writeFile(
    job.path + "/info.json",
    JSON.stringify(job.data, null, 2)
  );

  return;
};

export const getJobs = (pwd) => {
  if (!auth(pwd)) return;
  return jobs;
};
