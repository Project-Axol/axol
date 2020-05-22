import React from 'react';
import './App.css';
import ServerNav from './Components/ServerNav/ServerNav'
import ChannelNav from './Components/ChannelNav/ChannelNav'

function App() {
  return (
    <div className="App">
      <ServerNav />
      <ChannelNav />
    </div>
  );
}

export default App;
