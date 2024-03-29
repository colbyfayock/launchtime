import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

import { getCurrentMapRef, latlngFromFeature, findFeatureById, sortFeaturesByDistance } from 'lib/map';
import { getLocationCodeByLatlng, getLatlngByLocation } from 'lib/mapbox';
import { isDomAvailable } from 'lib/util';
import { isPostalCode } from 'lib/location';
import { useSearch } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

import BusinessCard from 'components/BusinessCard';
import SearchInput from 'components/SearchInput';

import businessesGeojson from 'data/businesses.json';
import utensilsIcon from 'assets/images/utensils-marker.png';
import utensilsIconActive from 'assets/images/utensils-marker-active.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DEFAULT_LOCATION = {
  lat: 0,
  lng: 0,
};
const DEFAULT_CENTER = [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng];
const DEFAULT_ZOOM = 14;

const SearchPage = () => {
  const featureGroupRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();

  let what;
  let where;
  let icon;
  let iconActive;

  if ( isDomAvailable()) {
    const currentUrl = new URL( window.location.href );

    what = currentUrl.searchParams.get( 'what' );
    where = currentUrl.searchParams.get( 'where' );

    icon = new L.Icon({
      iconUrl: utensilsIcon,
      iconSize: [26, 26],
      popupAnchor: [0, -15],
      shadowUrl: markerShadow,
      shadowAnchor: [13, 28],
    });

    iconActive = new L.Icon({
      iconUrl: utensilsIconActive,
      iconSize: [26, 26],
      popupAnchor: [0, -15],
      shadowUrl: markerShadow,
      shadowAnchor: [13, 28],
    });
  }

  const [search, updateSearch] = useState({
    query: what,
    postalcode: isPostalCode( where ) ? where : undefined,
    latlng: undefined,
  });
  const { query, postalcode, latlng } = search;

  const [activeBusiness, updateActiveBusiness] = useState();

  const businesses = businessesGeojson?.features.map(( feature ) => feature );

  const { results } = useSearch({
    query,
    data: businesses,
    keys: ['properties.name', 'properties.tags'],
  });

  const businessResults = sortFeaturesByDistance({
    features: results,
    latlng,
  });

  const mapSettings = {
    className: 'search-map',
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    mapEffect,
    ref: mapRef,
  };

  useEffect(() => {
    const map = getCurrentMapRef( mapRef );
    map.on( 'locationfound', handleOnLocationFound );
    return () => {
      map.off( 'locationfound', handleOnLocationFound );
    };
  }, []);

  useEffect(() => {
    async function request() {
      const map = getCurrentMapRef( mapRef );
      const locationLatlng = await getLatlngByLocation({ location: where });

      map.setView( locationLatlng );

      if ( isPostalCode( where )) return;

      const { postalcode, latlng } = await getLocationCodeByLatlng( locationLatlng );

      updateSearch(( prev ) => {
        return {
          ...prev,
          postalcode,
          latlng,
        };
      });
    }
    request();
  }, [where]);

  /**
   * mapEffect
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;

    if ( !featureGroupRef.current ) {
      featureGroupRef.current = L.featureGroup();
    }

    featureGroupRef.current.eachLayer(( layer ) => {
      featureGroupRef.current.removeLayer( layer );
      map.removeLayer( layer );
    });

    businessResults.forEach(( result ) => {
      const { properties = {} } = result;
      const { id } = properties;
      const location = latlngFromFeature( result );

      const isActive = id === activeBusiness?.properties?.id;

      const marker = L.marker( location, {
        icon: isActive ? iconActive : icon,
        zIndexOffset: 999,
        riseOnHover: true,
        id,
      });

      marker.on( 'mouseover', handleOnMarkerHoverOn );
      marker.on( 'mouseout', handleOnMarkerHoverOff );

      featureGroupRef.current.addLayer( marker );
      map.addLayer( marker );
    });
  }

  /**
   * handleOnSearchChange
   */

  function handleOnSearchChange({ currentTarget } = {}) {
    const value = currentTarget.value;
    updateSearch(( prev ) => {
      return {
        ...prev,
        query: value,
      };
    });
  }

  /**
   * handleOnBusinessHoverOn
   */

  function handleOnBusinessHoverOn({ currentTarget = {} } = {}) {
    const business = findFeatureById( businesses, currentTarget?.id );
    updateActiveBusiness( business );
  }

  /**
   * handleOnBusinessHoverOff
   */

  function handleOnBusinessHoverOff() {
    updateActiveBusiness( undefined );
  }

  /**
   * handleOnMarkerHoverOn
   */

  function handleOnMarkerHoverOn({ target = {} } = {}) {
    const business = findFeatureById( businesses, target?.options?.id );
    updateActiveBusiness( business );
  }

  /**
   * handleOnMarkerHoverOff
   */

  function handleOnMarkerHoverOff() {
    updateActiveBusiness( undefined );
  }

  /**
   * handleOnUseLocation
   */

  function handleOnUseLocation() {
    const map = getCurrentMapRef( mapRef );
    map.locate({
      setView: true,
    });
  }

  /**
   * handleOnLocationFound
   */

  async function handleOnLocationFound({ latlng } = {}) {
    const location = await getLocationCodeByLatlng( latlng );
    updateSearch(( prev ) => {
      return {
        ...prev,
        ...location,
      };
    });
  }

  /**
   * handleOnMarkerDragEnd
   */

  function handleOnMarkerDragEnd() {
    const { current = {} } = markerRef;
    const { leafletElement: marker } = current;

    if ( !marker ) return;

    updateSearch(( prev ) => {
      return {
        ...prev,
        where: undefined,
        latlng: marker.getLatLng(),
      };
    });
  }

  return (
    <Layout pageName="search">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Container className="search">
        <div className="search-sidebar">
          <SearchInput
            defaultQuery={query}
            defaultPostalCode={postalcode}
            onQueryChange={handleOnSearchChange}
            onUseLocation={handleOnUseLocation}
          />

          <div className="search-results">
            <p className="search-results-count">
              Showing <strong>{ businessResults.length }</strong> results...
            </p>
            <ul>
              { businessResults.map(( business = {}) => {
                const { properties = {} } = business;
                const { id } = properties;
                const location = latlngFromFeature( business );
                const isActive = activeBusiness?.properties?.id === id;
                let itemClass = 'search-results-item';

                if ( isActive ) {
                  itemClass = `${itemClass} search-results-item-active`;
                }

                return (
                  <li
                    key={id}
                    id={id}
                    className={itemClass}
                    onMouseEnter={handleOnBusinessHoverOn}
                    onMouseLeave={handleOnBusinessHoverOff}
                  >
                    <BusinessCard location={location} {...properties} />
                  </li>
                );
              }) }
            </ul>
          </div>
        </div>
        <Map {...mapSettings}>
          { latlng && <Marker ref={markerRef} position={latlng} draggable={true} onDragend={handleOnMarkerDragEnd} /> }
        </Map>
      </Container>
    </Layout>
  );
};

export default SearchPage;
