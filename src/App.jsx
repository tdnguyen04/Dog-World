import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import InfoBoard from './Components/InfoBoard';

function App() {
  const [banList, setBanList] = useState([]);
  const [seenList, setSeenList] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleExplore = () => {
    // Force InfoBoard to fetch a new dog
    setRefreshCount(refreshCount + 1);
  };
  return (
    <div className="content-center">
      <main>
        <h1>Dog World</h1>
        <p>Discover dogs from your wildest dream</p>
        <p>😀😏😟🤩😂🤓😇🤣😙😭😤😑🤕</p>
        <button onClick={handleExplore} className="main-btn">
          Explore
        </button>
        <InfoBoard
          key={refreshCount}
          banList={banList}
          setBanList={setBanList}
          seenList={seenList}
          setSeenList={setSeenList}
        />
      </main>
      <div className="seen-list">
        <h3>Who have we seen so far?</h3>
        {seenList.map((dog) => (
          <p key={dog}>{dog}</p>
        ))}
      </div>
      <div className="ban-list">
        <h3>Ban List</h3>
        <p className="instruction">
          Select an attribute in your listing to ban it
        </p>
        {banList.map((item) => (
          <div className="item">{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
