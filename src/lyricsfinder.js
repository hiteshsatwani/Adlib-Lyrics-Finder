const GeniusFetcher = require('genius-lyrics-fetcher');

const ACCESS_TOKEN = 'LxM_uBzeuJ8OktAN-gPYbAhBMeGZeimyGCaE98KxGvYinD5GT99DHXOD_lqb8dLk';
const client = new GeniusFetcher.Client(ACCESS_TOKEN);


client.fetch("Robbery", "Juice Wrld")
  .then(result => console.log(result.lyrics));
