import fetch from "node-fetch";
import storage from "../utils/storage.js";
import {
  BASE_URL,
  bytesToGB,
  formatAsTable,
  logo,
  showMessage,
} from "../utils/helpers.js";
import { UserDetailsResponse } from "../types/index.js";
import { createSpinner } from "nanospinner";

export default async function meAction() {
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

  const spinner = createSpinner("Getting user info...").start();

  try {
    const url = new URL(BASE_URL);

    url.pathname = "/me";

    // NOTE: try using key
    const res = await fetch(url, {
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

    spinner.success();

    const tableData = {
      "Current Plan": data.planId,
      "Used Storage": bytesToGB(data.planId),
      "Max Storage": bytesToGB(data.maxStorageBytes),
      "Max Upload": bytesToGB(data.maxUploadBytes),
      "Rate Limit": data.rateLimit,
    };

    showMessage("User info fetched successfully:\n", "success");

    return console.log(
      formatAsTable(tableData, {
        showHeaders: false,
        minWidth: 20,
      })
    );
  } catch (error) {
    spinner.stop();
    return showMessage(
      "Could not validate api key. Please try again.",
      "error"
    );
  }
}
