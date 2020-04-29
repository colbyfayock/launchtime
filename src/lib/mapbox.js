
import axios from 'axios';

const mapboxAccessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

const MAPBOX_API_HOST = 'https://api.mapbox.com';
const MAPBOX_REVERSE_GEOCODE_ENDPOINT = `${MAPBOX_API_HOST}/geocoding/v5/mapbox.places/{longitude},{latitude}.json`;

export async function getZipcodeByLatlng({lat, lng} = {}) {

  let url = MAPBOX_REVERSE_GEOCODE_ENDPOINT;
  let response;

  url = url.replace('{longitude}', lng);
  url = url.replace('{latitude}', lat);
  url = `${url}?access_token=${mapboxAccessToken}`

  try {
    response = await axios.get(url);
  } catch(e) {
    console.log('Failed to find latlng', e);
  }

  const { data = {} } = response;
  const { features = [] } = data;

  const postalcodeFeature = features.find(({ place_type }) => place_type.includes('postcode'));
  const { text } = postalcodeFeature || {};

  return text;
}