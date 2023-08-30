import fetch from "node-fetch";
import { password } from "@inquirer/prompts";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import { UserDetailsResponse } from "../types/index.js";
import { BASE_URL, logo, showMessage } from "../utils/helpers.js";

export const loginAction = async () => {
  console.log(logo);

  // NOTE: collect key
  const key = await password({ message: "Enter API Key", mask: true });

  const spinner = createSpinner("Checking Key...").start();

  // NOTE: key null check
  if (!key) {
    spinner.stop();
    return showMessage("Key not specified", "error");
  }

  try {
    // NOTE: try using key
    const res = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    const data = (await res.json()) as UserDetailsResponse;

    // NOTE: status check
    if (!data || !data.success) {
      spinner.stop();
      return showMessage(
        "Could not validate api key. Please try again.",
        "error"
      );
    }

    // NOTE: save key to db
    await storage.setItem("apiKey", key);

    spinner.success();

    return showMessage(
      "Key has been successfully registered you can now run other commands.",
      "success"
    );
  } catch (error) {
    spinner.stop();
    return showMessage(
      "Could not validate api key. Please try again.",
      "error"
    );
  }
};
