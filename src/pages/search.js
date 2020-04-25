import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

const DEFAULT_LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const DEFAULT_CENTER = [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng];
const DEFAULT_ZOOM = 2;

const SearchPage = () => {

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;
  }

  const mapSettings = {
    center: DEFAULT_CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="two">
      <Helmet>
        <title>Page Two</title>
      </Helmet>
      <Container type="content" className="text-center">
        <Map {...mapSettings} />
      </Container>
    </Layout>
  );
};

export default SearchPage;
