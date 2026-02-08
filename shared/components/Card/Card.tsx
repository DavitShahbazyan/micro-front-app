import React from 'react';
import './Card.css';

export interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, footer }) => {
  return (
    <div className="shared-card">
      <div className="shared-card__header">
        <h3 className="shared-card__title">{title}</h3>
      </div>
      <div className="shared-card__body">{children}</div>
      {footer && <div className="shared-card__footer">{footer}</div>}
    </div>
  );
};

