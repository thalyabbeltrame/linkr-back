import chalk from 'chalk';

import app from './app.js';
import './config/index.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(chalk.green.bold(`\nServer running on port ${port}...`));
});
