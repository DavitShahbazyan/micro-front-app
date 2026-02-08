import React, { Suspense } from 'react';
import { Button, Card } from '../../../shared';
import './App.css';

// Lazy load remote components
const RemoteButton = React.lazy(() => 
  import('remote/Button').then((module) => ({ default: module.default }))
);

const RemoteCard = React.lazy(() => 
  import('remote/Card').then((module) => ({ default: module.default }))
);

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Host Application (MicroFrontend)</h1>
        <p>This is the main container application</p>
      </header>

      <main className="app-main">
        <section className="components-section">
          <h2>Shared Components (from shared package)</h2>
          <div className="components-grid">
            <Card title="Shared Card Component">
              <p>This card component is from the shared package.</p>
              <Button label="Shared Button" variant="primary" />
            </Card>
          </div>
        </section>

        <section className="components-section">
          <h2>Remote Components (from remote app)</h2>
          <Suspense fallback={<div>Loading remote components...</div>}>
            <div className="components-grid">
              <RemoteCard title="Remote Card Component">
                <p>This card component is loaded from the remote application.</p>
                <RemoteButton label="Remote Button" variant="secondary" />
              </RemoteCard>
            </div>
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default App;

