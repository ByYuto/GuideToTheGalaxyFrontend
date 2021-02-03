import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Home from '../views/Home/Home';
import CreateArticle from '../views/CreateArticle/CreateArticle';
import Layout from '../components/Layout/Layout';
import ArticleDetail from '../views/ArticleDetail/ArticleDetail';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../views/NotFound/NotFound';
import ContentEditor from '../components/CreateArticle/DanteEditor/ContentEditor';
import history from './history';
import { Helmet } from 'react-helmet';
import { SITE_TITLE } from '../utils/constants';
//import ComponentsTestPage from '../views/ComponentsTestPage';

const RouterApp = () => {
  const { authorization } = useSelector((store) => store.auth);
  return (
    <Router history={history}>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact>
          <Layout home="home">
            <Helmet>
              <title>{SITE_TITLE}</title>
            </Helmet>
            <Home />
          </Layout>
        </Route>
        <Route path="/search" exact>
          <Layout home="search">
            <Helmet>
              <title>Search - {SITE_TITLE}</title>
            </Helmet>
            <Home />
          </Layout>
        </Route>
        {authorization && (
          <Route path="/create" exact>
            <Helmet>
              <title>Create new article - {SITE_TITLE}</title>
            </Helmet>
            <CreateArticle />
          </Route>
        )}
        <Route path="/testeditor" exact>
          <div style={{ padding: '50px' }}>
            <ContentEditor />
          </div>
        </Route>
        <Route path="/article/:slug" exact>
          <Layout home="search" noKeywords={true} view="detail">
            <ArticleDetail />
          </Layout>
        </Route>
        {/*<Route path="/test-components" exact>
          <ComponentsTestPage />
          </Route>*/}
        <Route path="**">
          <Layout>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterApp;
