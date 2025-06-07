import React from 'react';
import logo from './logo.svg';
import './App.css';
import StoryDashboard from './components/StoryDashboard';

function App() {
  return (
  <div>
      <StoryDashboard onUserSelect={()=>{}}/>
    </div>
  );
}

export default App;
