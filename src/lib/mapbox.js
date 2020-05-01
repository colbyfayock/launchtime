
import axios from 'axios';

const mapboxAccessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

const MAPBOX_API_HOST = 'https://api.mapbox.com';
const MAPBOX_REVERSE_GEOCODE_ENDPOINT = `${MAPBOX_API_HOST}/geocoding/v5/mapbox.places/{longitude},{latitude}.json`;
const MAPBOX_FORWARD_GEOCODE_ENDPOINT = `${MAPBOX_API_HOST}/geocoding/v5/mapbox.places/{search_text}.json`;

/**
 * findPostalCodeByLocation
 * @param {object} settings
 */

export async function findPostalCodeByLocation({ location }) {
  let url = MAPBOX_FORWARD_GEOCODE_ENDPOINT;
  let response;

  url = url.replace('{search_text}', encodeURIComponent(location));
  url = `${url}?access_token=${mapboxAccessToken}`

  try {
    response = await axios.get(url);
  } catch(e) {
    console.log('Failed to find latlng', e);
  }

  const { data = {} } = response;
  const { features = [] } = data;

  return findPostalCodeInFeatures(features);
}

/**
 * getPostalCodeByLatlng
 * @param {object} settings
 */

export async function getPostalCodeByLatlng({lat, lng} = {}) {

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

/**
 * findPostalCodeInFeatures
 * @param {object} settings
 */

function findPostalCodeInFeatures(features = []) {

  const postcodePlaceType = features.find(({ place_type }) => place_type.includes('postcode'));

  if ( postcodePlaceType ) {
    const { text } = postcodePlaceType;
    return text;
  }

  const poiPlaceType = features.find(({ place_type }) => place_type.includes('poi'));

  if ( poiPlaceType ) {
    const { context } = poiPlaceType;
    const postalCode = context.find(({id } = {}) => id.includes('postcode'))?.text;
    return postalCode;
  }

}