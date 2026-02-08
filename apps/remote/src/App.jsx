import React, { Suspense } from 'react';
import './App.css';

// Lazy load shared components from Module Federation
const Button = React.lazy(() => 
  import('shared/Button').then((module) => ({ default: module.Button || module.default }))
);

const Card = React.lazy(() => 
  import('shared/Card').then((module) => ({ default: module.Card || module.default }))
);

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Remote Application (MicroFrontend) </h1>
        <p>This is the remote application that exposes components</p>
      </header>

      <main className="app-main">
        <section className="components-section">
          <h2>Available Remote Components</h2>
          <Suspense fallback={<div>Loading shared components...</div>}>
            <div className="components-grid">
              <Card title="Remote Button Component">
                <p>This button component can be consumed by the host application.</p>
                <Button label="Click Me!" variant="primary" />
              </Card>
              <Card title="Remote Card Component">
                <p>This card component can be consumed by the host application.</p>
                <Button label="Action" variant="secondary" />
              </Card>
            </div>
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default App;

