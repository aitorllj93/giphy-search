import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  giphyApiKey: process.env.GIPHY_API_KEY,
};
