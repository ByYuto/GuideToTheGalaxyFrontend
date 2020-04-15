import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import CreateArticle from '../views/CreateArticle';
import Layout from '../components/Layout/Layout';
import ComponentsTestPage from '../views/ComponentsTestPage';

const Router = () =>
  <BrowserRouter>
    <Layout>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create" exact>
          <CreateArticle />
        </Route>
        <Route path="/test-components" exact>
          <ComponentsTestPage />
        </Route>
      </Switch>
    </Layout>
  </BrowserRouter>

export default Router;