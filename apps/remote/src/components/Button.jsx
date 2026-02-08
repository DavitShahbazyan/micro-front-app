import React from 'react';
import { Button as SharedButton } from '../../../../shared/components/Button';
import './Button.css';

// Re-export the shared Button component with custom styling
const Button = (props) => {
  return (
    <div className="remote-button-wrapper">
      <SharedButton {...props} />
      <span className="remote-button-badge">Remote</span>
    </div>
  );
};

export default Button;

