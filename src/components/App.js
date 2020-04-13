import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';

import Home from './Home';
import SearchComponent from './SearchComponent';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Route path="/" exact component={SearchComponent} />
          <Route path="/search/:username" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
