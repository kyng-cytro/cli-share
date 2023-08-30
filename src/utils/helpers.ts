import chalk from "chalk";

export const BASE_URL = "https://file.io";

export const header =
  chalk.cyan(`:'######::'##:::::::'####:::::::::::'######::'##::::'##::::'###::::'########::'########:
'##... ##: ##:::::::. ##:::::::::::'##... ##: ##:::: ##:::'## ##::: ##.... ##: ##.....::
 ##:::..:: ##:::::::: ##::::::::::: ##:::..:: ##:::: ##::'##:. ##:: ##:::: ##: ##:::::::
 ##::::::: ##:::::::: ##::'#######:. ######:: #########:'##:::. ##: ########:: ######:::
 ##::::::: ##:::::::: ##::........::..... ##: ##.... ##: #########: ##.. ##::: ##...::::
 ##::: ##: ##:::::::: ##:::::::::::'##::: ##: ##:::: ##: ##.... ##: ##::. ##:: ##:::::::
. ######:: ########:'####::::::::::. ######:: ##:::: ##: ##:::: ##: ##:::. ##: ########:
:......:::........::....::::::::::::......:::..:::::..::..:::::..::..:::::..::........::

Seamless command line file upload & sharing with file.io
`);

export const logo = chalk.cyan(`
:'######::'##:::::::'####:::::::::::'######::'##::::'##::::'###::::'########::'########:
'##... ##: ##:::::::. ##:::::::::::'##... ##: ##:::: ##:::'## ##::: ##.... ##: ##.....::
 ##:::..:: ##:::::::: ##::::::::::: ##:::..:: ##:::: ##::'##:. ##:: ##:::: ##: ##:::::::
 ##::::::: ##:::::::: ##::'#######:. ######:: #########:'##:::. ##: ########:: ######:::
 ##::::::: ##:::::::: ##::........::..... ##: ##.... ##: #########: ##.. ##::: ##...::::
 ##::: ##: ##:::::::: ##:::::::::::'##::: ##: ##:::: ##: ##.... ##: ##::. ##:: ##:::::::
. ######:: ########:'####::::::::::. ######:: ##:::: ##: ##:::: ##: ##:::. ##: ########:
:......:::........::....::::::::::::......:::..:::::..::..:::::..::..:::::..::........::
`);

export const showMessage = (
  message: string,
  type: "error" | "success" | "warn"
) => {
  if (type === "error") return console.log(chalk.bold.red(`ERROR: ${message}`));

  if (type === "success")
    return console.log(chalk.bold.green(`SUCESS: ${message}`));

  if (type === "warn")
    return console.log(chalk.bold.yellow(`WARNING: ${message}`));
};
