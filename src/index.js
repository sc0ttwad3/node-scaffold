import chalk from "chalk";

// simple logger
const log = (..._arg) => {
  return console.log(chalk.grey(..._arg))
}

// begin
log("index file start...");
