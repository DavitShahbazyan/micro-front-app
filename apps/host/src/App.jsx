import React, { Suspense } from 'react';
import './App.css';

// Lazy load shared components from Module Federation
const Button = React.lazy(() => 
  import('shared/Button').then((module) => ({ default: module.Button || module.default }))
);

const Card = React.lazy(() => 
  import('shared/Card').then((module) => ({ default: module.Card || module.default }))
);

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
          <h2>Shared Components (from shared package via Module Federation)</h2>
          <Suspense fallback={<div>Loading shared components...</div>}>
            <div className="components-grid">
              <Card title="Shared Card Component">
                <p>This card component is from the shared package.</p>
                <Button label="Shared Button" variant="primary" />
              </Card>
            </div>
          </Suspense>
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

