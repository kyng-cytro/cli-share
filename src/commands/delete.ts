import fetch from "node-fetch";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import { BASE_URL, logo, showMessage } from "../utils/helpers.js";
import { FileDetailsResponseList } from "../types/index.js";

export const deleteAction = async (opts: { key: string; all: boolean }) => {
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

  if (!opts.all && !opts.key) {
    return showMessage("You have to specify either a key or all", "error");
  }

  const spinner = createSpinner("Checking file path...").start();

  try {
    if (opts.all) {
      const url = new URL(BASE_URL);

      // NOTE: try all getting files
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const data = (await res.json()) as FileDetailsResponseList;

      // NOTE: status check
      if (!data || !data.success) {
        spinner.stop();
        return showMessage(
          `An error occured with message ${data.code}. Please try again.`,
          "error"
        );
      }

      if (!data.nodes.length) {
        spinner.stop();
        return showMessage("No files found to delete.", "error");
      }

      // NOTE: create array of promises
      const files = data.nodes.map((file) => {
        const url = new URL(BASE_URL);
        url.pathname = file.key;

        return fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${key}`,
          },
        });
      });

      await Promise.all(files);

      spinner.success();

      return showMessage("Files deleted successfully.", "success");
    } else {
      const url = new URL(BASE_URL);
      url.pathname = opts.key;

      // NOTE: try uploading file
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      // NOTE: status check
      if (res.status !== 200) {
        spinner.stop();
        return showMessage("An error occured, File might not exist.", "error");
      }

      spinner.success();

      return showMessage("File deleted successfully.", "success");
    }
  } catch (err) {
    spinner.stop();
    console.log(err);
    return showMessage("An error occured. Please try again.", "error");
  }
};
