import React from 'react';
import { Button, Card } from '../../../shared';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Remote Application (MicroFrontend)</h1>
        <p>This is the remote application that exposes components</p>
      </header>

      <main className="app-main">
        <section className="components-section">
          <h2>Available Remote Components</h2>
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
        </section>
      </main>
    </div>
  );
};

export default App;

