import express from 'express';
import { exec } from 'child_process';
import { createBuildCommand } from './helper/createBuildCommand';
import logger from './logger/logger';
import { isDryRun } from './helper/isDryRun';
import config from 'config';

const app = express();
const port = config.get('port');
const buildPath = config.get('buildPath');
const {
  env: { NODE_ENV },
} = process;

if (!NODE_ENV) {
  throw new Error('NODE_ENV is not defined.');
}

app.post('/build-app', (req, res) => {
  const { headers } = req;
  const buildCommand = createBuildCommand(NODE_ENV, config);

  if (isDryRun(headers)) {
    res.send(
      JSON.stringify({
        'node-environment': NODE_ENV,
        port,
        'build-path': buildPath,
        command: buildCommand,
      })
    );

    return;
  }

  exec(buildCommand, (error, _, stderr) => {
    if (error) {
      logger.error(`${stderr}`);
      res.status(500).send('Error building app');
    } else {
      logger.info(`${new Date().toLocaleString()} Build successful`);
      res.send('Build successful');
    }
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} in env: (${NODE_ENV})`);
});
