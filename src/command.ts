import { Command } from "commander";
import { header } from "./utils/helpers.js";
import { loginAction } from "./commands/login.js";
import { uploadAction } from "./commands/upload.js";

export const program = new Command();

program
  .name("cli-share")
  .description(header)
  .version("0.0.0")
  .action(() => {
    console.log(""); // Spacer
    console.log(header);
  });

program
  .command("upload <file-path>")
  .description("upload file to file.io")
  .action(uploadAction);

program
  .command("login")
  .description("register api-key from file.io")
  .action(loginAction);
