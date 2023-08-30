import chalk from "chalk";
import storage from "../utils/storage.js";
import { logo } from "../utils/helpers.js";
import { createSpinner } from "nanospinner";

export const uploadAction = async (filePath: string) => {
  console.log(logo);

  const key = await storage.getItem("apiKey");

  if (!key) {
    return console.log(
      chalk.red.bold(
        "ERROR: No API key available, please run the login command first. "
      )
    );
  }

  console.log("Only Authenticated should see this");
};
