import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import Form from 'components/Form';
import FormRow from 'components/FormRow';
import Input from 'components/Input';

const DEFAULT_LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const DEFAULT_CENTER = [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng];
const DEFAULT_ZOOM = 14;

const SearchPage = () => {
  const currentUrl = new URL(window.location.href);
  const what = currentUrl.searchParams.get('what');

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;
  }

  const mapSettings = {
    className: 'search-map',
    center: DEFAULT_CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="search">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Container className="search">
        <div className="search-sidebar">
          <Form className="search-form">
            <FormRow>
              <Input defaultValue={what} placeholder="Ex: pizza, bbq, breakfast" />
            </FormRow>
          </Form>
        </div>
        <Map {...mapSettings} />
      </Container>
    </Layout>
  );
};

export default SearchPage;
