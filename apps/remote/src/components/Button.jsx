import React, { Suspense } from 'react';
import './Button.css';

// Lazy load shared Button from Module Federation
const SharedButton = React.lazy(() => 
  import('shared/Button').then((module) => ({ default: module.Button || module.default }))
);

// Re-export the shared Button component with custom styling
const Button = (props) => {
  return (
    <div className="remote-button-wrapper">
      <Suspense fallback={<button>Loading...</button>}>
        <SharedButton {...props} />
      </Suspense>
      <span className="remote-button-badge">Remote</span>
    </div>
  );
};

export default Button;

