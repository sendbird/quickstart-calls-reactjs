import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.override.css';
import LoginPage from 'components/pages/LoginPage';

import GroupCallApp from './GroupCallApp';
import DirectCallApp from './DirectCallApp';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/direct-call" component={DirectCallApp} />
        <Route path="/group-call" component={GroupCallApp} />
        <Route path="/login" component={LoginPage} />
      </Switch>

      <ToastContainer
        position="bottom-left"
        autoClose={false}
        transition={Flip}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
