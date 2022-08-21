import { auth } from "../public/meta.js";
import { getJob } from "../public/jobManagement.js";
import { extname, resolve } from "path";
import fs from "fs/promises";

export const uploadHandler = async (req, res) => {
  let pwd = req.cookies.pwd;
  if (!auth(pwd)) return;
  let jobId = req.cookies.id;
  let file = req.files.web;
  let job = getJob(pwd, jobId);
  if (!job) return;
  let ext = extname(file.name);
  let filePath = job.path + "/" + job.data.downloads.length + ext;
  await fs.writeFile(filePath, file.data);
  job.data.downloads.push(resolve(filePath));
  res.status(200).send();
};
