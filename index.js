require('isomorphic-fetch')

const buildQueryUrl = location =>
  `https://www.metaweather.com/api/location/search?query=${location}`;
const buildWeatherUrl = woeid =>
  `https://www.metaweather.com/api/location/${woeid}/`;
const buildLatLongQueryUrl = (lat, lng) =>
  `https://www.metaweather.com/api/location/search?lattlong=${lat},${lng}`;

const findWeather = async location => {
  const locationInfo = await fetch(buildQueryUrl(location))
    .then(res => res.json())
    .catch(err => []);

  if (locationInfo.length === 0) {
    return { error: true, message: "could not find location!" };
  }

  return await fetch(buildWeatherUrl(locationInfo[0].woeid)).then(res =>
    res.json()
  );
};

const findClosest = async (lat, lng) => {
  const locationInfo = await fetch(buildLatLongQueryUrl(lat, lng))
    .then(res => res.json())
    .catch(err => []);

  if (locationInfo.length === 0) {
    return { error: true, message: "could not find location!" };
  }

  return await fetch(buildWeatherUrl(locationInfo[0].woeid)).then(res =>
    res.json()
  );
};

const getWeatherIcon = abbr =>
  `https://www.metaweather.com/static/img/weather/png/64/${abbr}.png`;

const calcTemp = temp => Math.round(temp * (9 / 5) + 32);

module.exports = {
  findWeather,
  findClosest,
  getWeatherIcon,
  calcTemp
 }
