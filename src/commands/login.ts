import chalk from "chalk";
import fetch from "node-fetch";
import { password } from "@inquirer/prompts";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import { BASE_URL, logo } from "../utils/helpers.js";

export const loginAction = async () => {
  console.log(logo);

  const key = await password({ message: "Enter API Key", mask: true });

  const spinner = createSpinner("Checking Key...").start();

  if (!key) return console.log("Key not specified");

  try {
    const res = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    const data = (await res.json()) as { success: string };

    if (!data || !data.success) {
      spinner.stop();
      return console.log(
        chalk.red.bold("ERROR: Could not validate api key. Please try again")
      );
    }

    spinner.success();

    await storage.setItem("apiKey", key);

    return console.log(
      chalk.green.bold(
        "SUCCESS: Key has been successfully registered you can now run other commands."
      )
    );
  } catch (error) {
    spinner.stop();
    return console.log(chalk.red.bold("ERROR: Could not validate api key"));
  }
};
