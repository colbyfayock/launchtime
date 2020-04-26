import React, { useState, useRef, useEffect } from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';
import { center, featureCollection, point } from '@turf/turf';

import { isDomAvailable } from 'lib/util';
import { useSearch } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import Form from 'components/Form';
import FormRow from 'components/FormRow';
import Input from 'components/Input';
import BusinessCard from 'components/BusinessCard';

import { businesses } from 'data/businesses';

const DEFAULT_LOCATION = {
  lat: 0,
  lng: 0
};
const DEFAULT_CENTER = [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng];
const DEFAULT_ZOOM = 14;

const SearchPage = () => {
  const featureGroupRef = useRef()

  let what;

  if ( isDomAvailable() ) {
    const currentUrl = new URL(window.location.href);
    what = currentUrl.searchParams.get('what');
  }

  const [search, updateSearch ] = useState({
    query: what
  });
  const { query } = search;

  const { results } = useSearch({
    query,
    data: businesses,
    keys: [
      'name',
      'tags'
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
      const { location } = result;
      const marker = L.marker(location);
      featureGroupRef.current.addLayer(marker);
      map.addLayer(marker);
    });

    if ( firstRun ) {
      const bounds = featureGroupRef.current.getBounds();
      console.log('bounds', bounds)
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
            <ul>
              {businessResults.map((business, i) => {
                return (
                  <li key={`Business-${i}`}>
                    <BusinessCard {...business} />
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
