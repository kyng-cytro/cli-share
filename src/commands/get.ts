import fetch from "node-fetch";
import storage from "../utils/storage.js";
import { createSpinner } from "nanospinner";
import { FileDetailsResponseList } from "../types/index.js";
import {
  BASE_URL,
  formatAsTable,
  logo,
  showMessage,
} from "../utils/helpers.js";

export const getAction = async (opts: {
  search: string;
  sort: string;
  offset: string;
  limit: string;
}) => {
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

  const spinner = createSpinner("Getting file(s) info...").start();

  try {
    const params = {
      search: opts.search || "",
      sort: opts.sort || "",
      offset: opts.offset || "",
      limit: opts.limit || "",
    };

    const url = new URL(BASE_URL);

    url.search = new URLSearchParams(params).toString();

    // NOTE: try getting files
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

    spinner.success();

    if (!data.nodes.length) {
      return showMessage(
        "No files found matching your search criteria.",
        "error"
      );
    }

    // NOTE: options
    const options = {
      showHeaders: true,
      truncate: true,
      columns: ["key", "name", "link", "size", "auto", "max", "expires"],
      config: {
        key: { maxWidth: 20, minWidth: 20 },
        name: { maxWidth: 20, minWidth: 20 },
        link: { maxWidth: 30, minWidth: 30 },
        size: { maxWidth: 10, minWidth: 10 },
        auto: { maxWidth: 10, minWidth: 10 },
        max: { maxWidth: 10, minWidth: 10 },
        expires: { maxWidth: 20, minWidth: 20 },
      },
    };

    // NOTE: map nodes to table data
    const table = data.nodes.map((file) => ({
      key: file.key,
      name: file.name,
      link: file.link,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      expires: new Date(file.expires).toLocaleDateString(),
      auto: file.autoDelete,
      max: file.maxDownloads,
    }));

    showMessage("Files loaded successfully:\n", "success");

    return console.log(formatAsTable(table, options));
  } catch (err) {
    spinner.stop();
    console.log(err);
    return showMessage("An error occured. Please try again.", "error");
  }
};
