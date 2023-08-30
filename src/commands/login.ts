import fetch from "node-fetch";
import { password } from "@inquirer/prompts";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import { BASE_URL, logo, showMessage } from "../utils/helpers.js";

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
      return showMessage(
        "Could not validate api key. Please try again.",
        "error"
      );
    }

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
