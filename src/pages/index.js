import React from 'react';
import { navigate } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Hero from 'components/Hero';
import Form from 'components/Form';
import FormRow from 'components/FormRow';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Logo from 'components/Logo';

const IndexPage = () => {
  /**
   * handleOnSearchSubmit
   */

  async function handleOnSearchSubmit( e = {}) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const { elements } = currentTarget;

    const fields = Array.from( elements ).map(( element ) => {
      const id = element.id;
      const name = element.name;
      const value = element.value;
      return {
        id,
        name,
        value,
      };
    });

    const what = fields.find(( field ) => field.name === 'search-what' ).value;
    const where = fields.find(( field ) => field.name === 'search-where' ).value;

    navigate( `/search?what=${encodeURIComponent( what )}&where=${encodeURIComponent( where )}` );
  }

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Container>
        <Hero backgroundImage="/images/people-in-restaurant-eating.jpg">
          <Form onSubmit={handleOnSearchSubmit}>
            <FormRow>
              <Label htmlFor="search-what">What do you want to eat?</Label>
              <Input id="search-what" placeholder="Ex: pizza, bbq, breakfast" />
            </FormRow>
            <FormRow>
              <Label htmlFor="search-where">Where do you want to eat it?</Label>
              <Input id="search-where" placeholder="Ex: Washington, DC" />
            </FormRow>
            <FormRow>
              <Button color="cyan">Find Some Food</Button>
            </FormRow>
          </Form>
        </Hero>
      </Container>

      <Container type="content" className="text-center">
        <div className="home-intro">
          <h2>
            <Logo />
          </h2>
          <p>Lunch doesn&apos;t have to be rocket science!</p>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
