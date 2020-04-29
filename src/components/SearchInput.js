import React from 'react';
import { FaLocationArrow, FaMapMarkerAlt } from 'react-icons/fa';

import Form from 'components/Form';
import FormRow from 'components/FormRow';
import Input from 'components/Input';

const SearchInput = props => {
  const { defaultQuery, defaultPostalCode, onQueryChange, onUseLocation } = props;

  function handleOnUseLocation(e) {
    e.preventDefault();
    if ( typeof onUseLocation === 'function' ) {
      onUseLocation(e);
    }
  }

  return (
    <Form className="search-input">
      <FormRow className="search-input-query">
        <Input className="search-input-query-input" defaultValue={defaultQuery} placeholder="Ex: pizza, bbq, breakfast" onChange={onQueryChange} />
      </FormRow>
      <FormRow className="search-input-location">
        <div className="search-input-postal">
          <label htmlFor="postalcode">
            <FaMapMarkerAlt />
          </label>
          <Input id="postalcode" className="search-input-postal-input" defaultValue={defaultPostalCode} placeholder="12345" />
        </div>
        <button className="search-input-use-location" onClick={handleOnUseLocation}>
          <FaLocationArrow /> Use My Location
        </button>
      </FormRow>
    </Form>
  )
}

export default SearchInput;