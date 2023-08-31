import path from "path";
import fs from "fs/promises";
import clipboard from "clipboardy";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import fetch, { FormData, File } from "node-fetch";
import { FileDetailsResponse } from "../types/index.js";
import {
  BASE_URL,
  formatAsTable,
  logo,
  showMessage,
} from "../utils/helpers.js";

export const uploadAction = async (
  filePath: string,
  opts: { copy: boolean; auto: boolean; expires: string; max: number }
) => {
  console.log(logo);

  // NOTE: get key
  const key = await storage.getItem("apiKey");

  // NOTE: check key
  if (!key) {
    return showMessage(
      "Please run the 'login' command first to authenticate and access file.io services.",
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

      const url = new URL(BASE_URL);

      const formData = new FormData();
      formData.append("file", new File(file, name));
      formData.append("autoDelete", opts.auto);
      if (opts.max) formData.append("maxDownloads", opts.max);
      if (opts.expires) formData.append("expires", opts.expires);

      // NOTE: try uploading file
      const res = await fetch(url, {
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
        return showMessage(
          `An error occured with message ${data.code}. Please try again.`,
          "error"
        );
      }

      spinner.success();

      const tableData = {
        "File Key": data.key,
        "File Name": data.name,
        "File Link": data.link,
        "File Expires": new Date(data.expires).toLocaleDateString(),
        "Auto Delete": data.autoDelete,
        "Max Downloads": data.maxDownloads,
      };

      if (opts.copy) {
        clipboard.write(data.link);
      }

      showMessage(
        opts.copy
          ? "File uploaded and link copied successfully:\n"
          : "File uploaded successfully:\n",
        "success"
      );

      return console.log(
        formatAsTable(tableData, {
          showHeaders: false,
          minWidth: 20,
        })
      );
    } catch {
      spinner.stop();
      return showMessage("An error occured. Please try again.", "error");
    }
  } catch {
    spinner.stop();
    return showMessage("Invalid file path. Please try again.", "error");
  }
};
