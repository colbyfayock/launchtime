import React from 'react';
import { FaPhone, FaDirections, FaUtensils, FaStar, FaDollarSign } from 'react-icons/fa';

import Button from 'components/Button';

const BusinessCard = ({ thumb, name, tags = [] }) => {
  return (
    <div className="business-card">
      <img src={ thumb } alt={name} />
      <div className="business-card-content">
        <div className="business-card-header">
          <p className="business-card-title">
            { name }
          </p>
          <ul className="business-card-meta">
            <li>
              <span className="business-card-rating">
                <FaStar className="business-card-rating-highlight" />
                <FaStar className="business-card-rating-highlight" />
                <FaStar />
                <FaStar />
              </span>
            </li>
            <li>
              <span className="business-card-cost">
                <FaDollarSign className="business-card-cost-highlight" />
                <FaDollarSign className="business-card-cost-highlight" />
                <FaDollarSign />
                <FaDollarSign />
              </span>
            </li>
          </ul>
        </div>
        <p className="business-card-tags">
          { tags.join(', ') }
        </p>
        <div className="business-card-actions">
          <ul className="business-card-actions-info">
            <li>
              <Button>
                <span className="business-card-actions-info-icon">
                  <FaPhone className="icon-phone" />
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
  )
}

export default BusinessCard;