import React, { Suspense } from 'react';
import './Card.css';

// Lazy load shared Card from Module Federation
const SharedCard = React.lazy(() => 
  import('shared/Card').then((module) => ({ default: module.Card || module.default }))
);

// Re-export the shared Card component with custom styling
const Card = (props) => {
  return (
    <div className="remote-card-wrapper">
      <Suspense fallback={<div>Loading...</div>}>
        <SharedCard {...props} />
      </Suspense>
      <div className="remote-card-badge">Remote Component</div>
    </div>
  );
};

export default Card;

