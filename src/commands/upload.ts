import path from "path";
import fs from "fs/promises";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import fetch, { FormData, File } from "node-fetch";
import { FileDetailsResponse } from "../types/index.js";
import { BASE_URL, logo, showMessage } from "../utils/helpers.js";

export const uploadAction = async (filePath: string) => {
  console.log(logo);

  // NOTE: get key
  const key = await storage.getItem("apiKey");

  // NOTE: check key
  if (!key) {
    return showMessage(
      "No API key available, please run the login command first.",
      "error"
    );
  }

  const spinner = createSpinner("Checking file path...").start();

  try {
    //NOTE: check if is file
    if (!(await fs.lstat(filePath)).isFile()) {
      spinner.stop();
      return showMessage("Invalid file path. Please try again.", "error");
    }

    spinner.update({ text: "uploading file..." });

    // NOTE: load file
    const file = await fs.readFile(filePath);

    // NOTE: get file name
    const name = path.basename(filePath);

    try {
      // NOTE: create form
      const formData = new FormData();
      formData.append("file", new File(file, name));

      // NOTE: try uploading file
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const data = (await res.json()) as FileDetailsResponse;

      // NOTE: status check
      if (!data || !data.success) {
        spinner.stop();
        console.log(data);
        return showMessage("An error occured. Please try again.", "error");
      }

      spinner.success();

      showMessage("File uploaded successfully:\n", "success");
    } catch (err) {
      spinner.stop();
      console.log(err);
      return showMessage("An error occured. Please try again.", "error");
    }
  } catch {
    spinner.stop();
    return showMessage("Invalid file path. Please try again.", "error");
  }
};
