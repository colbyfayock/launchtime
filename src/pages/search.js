import React, { useState, useRef, useEffect } from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';

import { latlngFromFeature, findFeatureById } from 'lib/map';
import { isDomAvailable } from 'lib/util';
import { useSearch } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import Form from 'components/Form';
import FormRow from 'components/FormRow';
import Input from 'components/Input';
import BusinessCard from 'components/BusinessCard';

import businessesGeojson from 'data/businesses.json';
import utensilsIcon from 'assets/images/utensils-marker.png';
import utensilsIconActive from 'assets/images/utensils-marker-active.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DEFAULT_LOCATION = {
  lat: 0,
  lng: 0
};
const DEFAULT_CENTER = [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng];
const DEFAULT_ZOOM = 14;

const SearchPage = () => {
  const featureGroupRef = useRef()

  let what;
  let icon;
  let iconActive;

  if ( isDomAvailable() ) {
    const currentUrl = new URL(window.location.href);

    what = currentUrl.searchParams.get('what');

    icon = new L.Icon({
      iconUrl: utensilsIcon,
      iconSize: [26, 26],
      popupAnchor: [0, -15],
      shadowUrl: markerShadow,
      shadowAnchor: [13, 28]
    });

    iconActive = new L.Icon({
      iconUrl: utensilsIconActive,
      iconSize: [26, 26],
      popupAnchor: [0, -15],
      shadowUrl: markerShadow,
      shadowAnchor: [13, 28]
    });
  }

  const [search, updateSearch ] = useState({
    query: what
  });
  const { query } = search;

  const [activeBusiness, updateActiveBusiness] = useState();

  const businesses = businessesGeojson?.features.map(feature => feature);

  const { results } = useSearch({
    query,
    data: businesses,
    keys: [
      'properties.name',
      'properties.tags'
    ]
  });

  const businessResults = results.map(result => result.item );

  const mapSettings = {
    className: 'search-map',
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  /**
   * mapEffect
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;
    let firstRun = false;

    if ( !featureGroupRef.current ) {
      firstRun = true;
      featureGroupRef.current = L.featureGroup();
    }

    featureGroupRef.current.eachLayer(layer => {
      featureGroupRef.current.removeLayer(layer)
      map.removeLayer(layer);
    });

    businessResults.forEach(result => {
      const { properties = {} } = result;
      const { id } = properties;
      const location = latlngFromFeature(result);

      const isActive = id === activeBusiness?.properties?.id;

      const marker = L.marker(location, {
        icon: isActive ? iconActive : icon,
        zIndexOffset: 999,
        riseOnHover: true,
        id
      });

      marker.on('mouseover', handleOnMarkerHoverOn);
      marker.on('mouseout', handleOnMarkerHoverOff);

      featureGroupRef.current.addLayer(marker);
      map.addLayer(marker);
    });

    if ( firstRun ) {
      const bounds = featureGroupRef.current.getBounds();
      map.fitBounds(bounds);
    }
  }

  /**
   * handleOnSearchChange
   */

  function handleOnSearchChange({ currentTarget } = {}) {
    const value = currentTarget.value;
    updateSearch(prev => {
      return {
        ...prev,
        query: value
      }
    })
  }

  /**
   * handleOnBusinessHoverOn
   */

  function handleOnBusinessHoverOn({ currentTarget = {} } = {}) {
    const business = findFeatureById(businesses, currentTarget?.id);
    updateActiveBusiness(business);
  }

  /**
   * handleOnBusinessHoverOff
   */

  function handleOnBusinessHoverOff() {
    updateActiveBusiness(undefined);
  }

  /**
   * handleOnMarkerHoverOn
   */

  function handleOnMarkerHoverOn({ target = {} } = {}) {
    const business = findFeatureById(businesses, target?.options?.id);
    updateActiveBusiness(business);
  }

  /**
   * handleOnMarkerHoverOff
   */

  function handleOnMarkerHoverOff() {
    updateActiveBusiness(undefined);
  }

  return (
    <Layout pageName="search">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Container className="search">
        <div className="search-sidebar">
          <Form className="search-form">
            <FormRow>
              <Input defaultValue={what} placeholder="Ex: pizza, bbq, breakfast" onChange={handleOnSearchChange} />
            </FormRow>
          </Form>
          <div className="search-results">
            <p className="search-results-count">
              Showing <strong>{ businessResults.length }</strong> results...
            </p>
            <ul>
              {businessResults.map((business = {}, i) => {
                const { properties = {} } = business;
                const { id } = properties;
                const location = latlngFromFeature(business);
                const isActive = activeBusiness?.properties?.id === id;
                let itemClass = 'search-results-item';

                if ( isActive ) {
                  itemClass = `${itemClass} search-results-item-active`
                }

                return (
                  <li key={id} id={id} className={itemClass} onMouseEnter={handleOnBusinessHoverOn} onMouseLeave={handleOnBusinessHoverOff}>
                    <BusinessCard location={location} {...properties} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <Map {...mapSettings} />
      </Container>
    </Layout>
  );
};

export default SearchPage;
