import chalk from "chalk";

import "./config/index.js";
import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(chalk.green.bold(`\nServer running on port ${port}...`));
});
