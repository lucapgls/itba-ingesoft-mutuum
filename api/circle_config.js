import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import { config } from 'dotenv';

config();

const apiKey = process.env.CIRCLE_API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

if (!apiKey || !entitySecret) {
    throw new Error('CIRCLE_API_KEY and ENTITY_SECRET must be set in the environment variables');
}

const circleClient = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
})

export default circleClient;
