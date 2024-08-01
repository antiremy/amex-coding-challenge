const catsData = require('../mock/getCats.json');
const dogsData = require('../mock/getDogs.json');

const data = {
  cats: catsData,
  dogs: dogsData,
};

const mockFetch = (api, token) => {
  return new Promise ((res, rej) => {
    setTimeout(() => {
      res(data[api]);
    }, 1000);
  });
}

module.exports = mockFetch;