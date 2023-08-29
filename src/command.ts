import { Command } from "commander";

export const program = new Command();

program
  .name("cli-share")
  .description("Seamless command line file upload & sharing with file.io")
  .version("0.0.0");
