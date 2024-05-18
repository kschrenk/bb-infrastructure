import type { IConfig } from 'config'
import { isProduction } from "./isProduction";

export const createBuildCommand = (env: string, config: IConfig) => {
  let buildCommand = `cd ${config.get('buildPath')} && npm run build`;
  
  if (isProduction(env)) {
    buildCommand = buildCommand.concat(` && pm2 reload ${config.get('clientName')}`);
  }

  return buildCommand
}