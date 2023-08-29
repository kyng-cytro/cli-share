import { Command } from "commander";
import { header, logo } from "./helpers";

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
  .command("login <api-key>")
  .description("Register api-key from file.io")
  .action((key: string) => {
    console.log(logo);
    console.log("Ready", key);
  });
