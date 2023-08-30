import fs from "fs/promises";
import storage from "../utils/storage.js";
import { logo, showMessage } from "../utils/helpers.js";
import { createSpinner } from "nanospinner";

export const uploadAction = async (filePath: string) => {
  console.log(logo);

  const key = await storage.getItem("apiKey");

  if (!key) {
    return showMessage(
      "No API key available, please run the login command first.",
      "error"
    );
  }

  const spinner = createSpinner("Checking file path...").start();

  try {
    if (!(await fs.lstat(filePath)).isFile()) {
      spinner.stop();
      return showMessage("Invalid file path. Please try again.", "error");
    }

    spinner.update({ text: "uploading file..." });

    const file = await fs.readFile(filePath);

    spinner.stop();
    console.log(file);
  } catch {
    spinner.stop();
    return showMessage("Invalid file path. Please try again.", "error");
  }
};
