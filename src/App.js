import React from 'react';
import './App.css';
import SnakeGame from './SnakeGame';

function App() {
  return (
    
    <div className="App" style={{ textAlign: 'center' }}>
      <header className="App-header">
        <h1>Welcome To My Page</h1>
        <p> Thanks for Clicking </p>
      
      </header>
      <section>
     <h2>Who am I?</h2>
    <p>
     Hi, I'm Joseph, and this is my personal website. I'm a passionate student into game, web and app development :D       
     </p>
     <p>
     - - - - - - -  - - - - - - - - - - - - - - - - - - - Scroll down to see some projects I've made - - - - - - - - - - - - - - - - - - - - - - - -
     </p>
</section>

  <section>
        <h1 style={{ textAlign: 'center', color: '##00ff00' }}>Snake Game</h1>
        <SnakeGame />
      </section>
    </div>


  
    
  );
 
}




export default App;

