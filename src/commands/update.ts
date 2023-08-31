import fetch, { FormData } from "node-fetch";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import {
  BASE_URL,
  formatAsTable,
  logo,
  showMessage,
} from "../utils/helpers.js";
import { FileDetailsResponse } from "../types/index.js";

export const updateAction = async (
  fileKey: string,
  opts: { auto: boolean; expires: string; max: number }
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

  const spinner = createSpinner("Updating file info...").start();

  try {
    const url = new URL(BASE_URL);

    url.pathname = fileKey;

    const formData = new FormData();
    formData.append("autoDelete", opts.auto);
    if (opts.max) formData.append("maxDownloads", opts.max);
    if (opts.expires) formData.append("expires", opts.expires);

    // NOTE: try uploading file
    const res = await fetch(url, {
      method: "PATCH",
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

    showMessage("File updated successfully:\n", "success");

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
};
