import { useState } from "react";
import "./App.css";
import KyupidMap from "./Components/KyupidMap";
import Toggle from "./Components/Toggle";

function App() {
  const [showRevenue, setShowRevenue] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kyupid - Dashboard</h1>

        <Toggle
          checked={showRevenue}
          label='Show Revenue'
          onChange={e => setShowRevenue(e.target.checked)}
        />
      </header>
      <main className="App-container">
        <KyupidMap showRevenue={showRevenue} />
      </main>
      <main className={`App-controls ${!showRevenue ? 'hide' : ''}`}>
        <div className="color_lable_wrapper">
          <div>
            <div className="color-box high"></div>
            High revenue - Pro users &gt; 50
          </div>

          <div>
            <div className="color-box medium"></div>
            Medium revenue - Pro users &ge; 40 and Pro users &le; 50
          </div>

          <div>
            <div className="color-box low"></div>
            Low revenue - Pro users &lt; 40
          </div>
        </div>
      </main>

      <main className={`App-controls ${showRevenue ? 'hide' : ''}`}>
        <div className="color_lable_wrapper">
          Random
        </div>
      </main>

    </div>
  );
}

export default App;
