import React from 'react';
import Helmet from 'react-helmet';
import { FaPhone, FaDirections, FaUtensils } from 'react-icons/fa';

import { isDomAvailable } from 'lib/util';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import Form from 'components/Form';
import FormRow from 'components/FormRow';
import Input from 'components/Input';
import Button from 'components/Button';

const DEFAULT_LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const DEFAULT_CENTER = [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng];
const DEFAULT_ZOOM = 14;

const SearchPage = () => {
  let what;

  if ( isDomAvailable() ) {
    const currentUrl = new URL(window.location.href);
    what = currentUrl.searchParams.get('what');
  }

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;
  }

  const mapSettings = {
    className: 'search-map',
    center: DEFAULT_CENTER,
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
          <div className="search-results">
            <ul>
              <li>
                <div className="business-card">
                  <img src="https://www.placecage.com/200/200" alt="Picture of DC Pizza" />
                  <div className="business-card-content">
                    <div className="business-card-header">
                      <p className="business-card-title">
                        DC Pizza
                      </p>
                    </div>
                    <p className="business-card-tags">
                      Pizza, Wings, Sandwiches, Salads
                    </p>
                    <div className="business-card-actions">
                      <ul className="business-card-actions-info">
                        <li>
                          <Button>
                            <span className="business-card-actions-info-icon">
                              <FaPhone />
                            </span>
                            Call
                          </Button>
                        </li>
                        <li>
                          <Button>
                            <span className="business-card-actions-info-icon">
                              <FaDirections />
                            </span>
                            Map
                          </Button>
                        </li>
                        <li>
                          <Button>
                            <span className="business-card-actions-info-icon">
                              <FaUtensils />
                            </span>
                            Menu
                          </Button>
                        </li>
                      </ul>
                      <div className="business-card-actions-order">
                        <Button color="cyan">
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Map {...mapSettings} />
      </Container>
    </Layout>
  );
};

export default SearchPage;
