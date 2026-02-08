import React from 'react';
import { Card as SharedCard } from '../../../../shared/components/Card';
import './Card.css';

// Re-export the shared Card component with custom styling
const Card = (props) => {
  return (
    <div className="remote-card-wrapper">
      <SharedCard {...props} />
      <div className="remote-card-badge">Remote Component</div>
    </div>
  );
};

export default Card;

