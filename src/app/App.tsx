import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Welcome from './components/Welcome/Welcome';
import EnterLot from './components/EnterLot/EnterLot';
import DenseAppBar from './components/AppBar/DenseAppBar';

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <header>
          <DenseAppBar />
          {/* <Welcome /> */}

          <Switch>
            <Route path="/about">
              <main>About</main>
            </Route>
            <Route path="/enterlot">
              <main>
                <EnterLot />
              </main>
            </Route>
            <Route path="/">
              <main>
                <EnterLot />
              </main>
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
