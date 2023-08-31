import { Command } from "commander";
import meAction from "./commands/me.js";
import getAction from "./commands/get.js";
import { header } from "./utils/helpers.js";
import loginAction from "./commands/login.js";
import deleteAction from "./commands/delete.js";
import updateAction from "./commands/update.js";
import uploadAction from "./commands/upload.js";

export const program = new Command();

program
  .name("cli-share")
  .description(header)
  .version("0.0.0")
  .action(() => {
    console.log(""); // Spacer
    console.log(header);
  });

// NOTE: me command
program.command("me").description("Get your account info.").action(meAction);

// NOTE: login command
program
  .command("login")
  .description("Input your file.io API key for managing uploads and downloads.")
  .action(loginAction);

// NOTE: get command
program
  .command("get")
  .option("-s --search <search-query>", "Search by file name.")
  .option("--offset <number>", "Skip a specified number of files.")
  .option("--limit <number>", "Limit the number of files displayed.")
  .option("--sort <sort-by>", "Sort files by a specific field.")
  .description("Retrieve shared files from file.io.")
  .action(getAction);

// NOTE: delete command
program
  .command("delete")
  .option("--all", "Delete all files.")
  .option("-k --key <file-key>", "Specify the file key to delete.")
  .description("Delete specific or all files.")
  .action(deleteAction);

// NOTE: update command
program
  .command("update <file-key>")
  .option(
    "-e --expires <life-span>",
    "Set an automatic file deletion time span. For example, use '5d' for 5 days."
  )
  .option(
    "-m --max <max-download>",
    "Specify the maximum download count for the file. Default value, requires a valid plan."
  )
  .option(
    "-a --auto",
    "Enable automatic file deletion after download. Requires a valid plan."
  )

  .description("Update file options")
  .action(updateAction);

// NOTE: upload command
program
  .command("upload <file-path>")
  .option(
    "-e --expires <life-span>",
    "Set an automatic file deletion time span. For example, use '5d' for 5 days."
  )
  .option(
    "-m --max <max-download>",
    "Specify the maximum download count for the file. Default value, requires a valid plan."
  )
  .option("-c --copy", "Copy the share link to clipboard.")
  .option(
    "-a --auto",
    "Enable automatic file deletion after download. Requires a valid plan."
  )

  .description("Upload a file to file.io for sharing.")
  .action(uploadAction);
