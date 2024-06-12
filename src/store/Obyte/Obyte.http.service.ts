import obyte from 'obyte-http-client';

export default new obyte.Client({
  testnet: false,
  hubAddress: 'https://obyte.org/api',
});
