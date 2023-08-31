import { Command } from "commander";
import { header } from "./utils/helpers.js";
import { loginAction } from "./commands/login.js";
import { uploadAction } from "./commands/upload.js";
import { getAction } from "./commands/get.js";
import { updateAction } from "./commands/update.js";

export const program = new Command();

program
  .name("cli-share")
  .description(header)
  .version("0.0.0")
  .action(() => {
    console.log(""); // Spacer
    console.log(header);
  });

// NOTE: login command
program
  .command("login")
  .description("Input your file.io API key for managing uploads and downloads.")
  .action(loginAction);

// NOTE: upload command
program
  .command("upload <file-path>")
  .option("-c --copy", "Copy the share link to clipboard.")
  .option(
    "-a --auto",
    "Enable automatic file deletion after download. Requires a valid plan."
  )
  .option(
    "-e --expires <life-span>",
    "Set an automatic file deletion time span. For example, use '5d' for 5 days."
  )
  .option(
    "-m --max <max-download>",
    "Specify the maximum download count for the file. Default value, requires a valid plan."
  )
  .description("Upload a file to file.io for sharing.")
  .action(uploadAction);

// NOTE: get command
program
  .command("get")
  .option("-s --search <search-query>", "Search by file name.")
  .option("--sort <sort-by>", "Sort files by a specific field.")
  .option("--offset <number>", "Skip a specified number of files.")
  .option("--limit <number>", "Limit the number of files displayed.")
  .description("Retrieve shared files from file.io.")
  .action(getAction);

// NOTE: update command
program
  .command("update <file-key>")
  .option(
    "-a --auto",
    "Enable automatic file deletion after download. Requires a valid plan."
  )
  .option(
    "-e --expires <life-span>",
    "Set an automatic file deletion time span. For example, use '5d' for 5 days."
  )
  .option(
    "-m --max <max-download>",
    "Specify the maximum download count for the file. Default value, requires a valid plan."
  )
  .description("Update file options")
  .action(updateAction);
