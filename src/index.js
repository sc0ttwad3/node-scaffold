import { _, it } from 'param.macro';
import chalk from "chalk";

const logBlue = console.log(chalk.blue(..._));
const logYellow = console.log(chalk.yellow(..._));
const log = console.log(chalk.grey(..._));

log("index file start...");
