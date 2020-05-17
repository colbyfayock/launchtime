import { getCoord, distance, point } from '@turf/turf';

import { sortByObjectKey } from 'lib/util';

/**
 * getCurrentMapRef
 */

export function getCurrentMapRef( ref = {}) {
  const { current = {} } = ref;
  const { leafletElement } = current;
  return leafletElement;
}

/**
 * promiseToFlyTo
 * @description
 */

export function promiseToFlyTo( map, { zoom, center }) {
  return new Promise(( resolve, reject ) => {
    const baseError = 'Failed to fly to area';

    if ( !map.flyTo ) {
      reject( `${baseError}: no flyTo method on map` );
    }

    if ( typeof zoom !== 'number' ) {
      reject( `${baseError}: zoom invalid number ${zoom}` );
    }

    const mapCenter = center || map.getCenter();
    const mapZoom = zoom || map.getZoom();

    map.flyTo( mapCenter, mapZoom, {
      duration: 2,
    });

    map.once( 'moveend', () => {
      resolve();
    });
  });
}

/**
 * getCurrentLocation
 * @description
 */

export function getCurrentLocation() {
  return new Promise(( resolve, reject ) => {
    navigator.geolocation.getCurrentPosition(
      ( pos ) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      ( err ) => reject( err )
    );
  });
}

/**
 * latlngFromFeature
 */

export function latlngFromFeature( feature = {}) {
  const { geometry = {} } = feature;
  const { coordinates = [], type } = geometry;

  if ( type !== 'Point' ) {
    throw new Error( `latlngFromFeature: Invalid geometry type ${type}` );
  }

  return [coordinates[1], coordinates[0]];
}

/**
 * findFeatureById
 */

export function findFeatureById( features, id ) {
  if ( !Array.isArray( features )) return;
  return features.find(({ properties } = {}) => properties?.id === id );
}

/**
 * sortFeaturesByDistance
 */

export function sortFeaturesByDistance({ features, latlng }) {
  if ( !latlng ) return features;

  const featuresWithDistance = features.map(( feature ) => {
    return {
      feature,
      distance: getDistanceToLatlng( feature, latlng ),
    };
  });

  const sortedFeatures = sortByObjectKey( featuresWithDistance, 'distance' );

  return sortedFeatures.map(({ feature } = {}) => {
    return {
      ...feature,
    };
  });
}

/**
 * getDistanceToLatlng
 * @param {object} feature Feature Point to calculate distance from
 * @param {object} latlng Latlng to calculate distance to
 */

export function getDistanceToLatlng( feature, latlng ) {
  const featureCoordinates = getCoord( feature );
  const from = point( featureCoordinates );
  const to = point([latlng?.lng, latlng?.lat]);
  return distance( from, to, {
    units: 'miles',
  });
}
