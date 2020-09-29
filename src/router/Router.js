import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../views/Home/Home';
import CreateArticle from '../views/CreateArticle/CreateArticle';
import Layout from '../components/Layout/Layout';
import ArticleDetail from '../views/ArticleDetail/ArticleDetail';
import { useSelector } from 'react-redux';
import NotFound from '../views/NotFound/NotFound';
//import ComponentsTestPage from '../views/ComponentsTestPage';

const Router = () => {
  const { authorization } = useSelector((store) => store.auth);
  return (
    <BrowserRouter>
      <Layout>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {authorization && (
            <Route path="/create" exact>
              <CreateArticle />
            </Route>
          )}
          <Route path="/article/:id" exact>
            <ArticleDetail />
          </Route>
          {/*<Route path="/test-components" exact>
          <ComponentsTestPage />
          </Route>*/}
          <Route path="**">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
