import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { PasteViewer } from './pages/PasteViewer';
import { NotFound } from './pages/NotFound';
import { theme } from './themes/theme';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>

            <Route path="/p/:pasteUrl">
              <PasteViewer />
            </Route>

            <Route path="/:subpath">
              <NotFound />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export { App };