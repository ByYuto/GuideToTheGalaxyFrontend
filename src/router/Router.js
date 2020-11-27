import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../views/Home/Home';
import CreateArticle from '../views/CreateArticle/CreateArticle';
import Layout from '../components/Layout/Layout';
import ArticleDetail from '../views/ArticleDetail/ArticleDetail';
import { useSelector } from 'react-redux';
import NotFound from '../views/NotFound/NotFound';
import ContentEditor from '../components/CreateArticle/DanteEditor/ContentEditor'
//import ComponentsTestPage from '../views/ComponentsTestPage';

const Router = () => {
  const { authorization } = useSelector((store) => store.auth);
  return (
    <BrowserRouter>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact>
          <Layout home="home">
            <Home />
          </Layout>
        </Route>
        <Route path="/search" exact>
          <Layout home="search">
            <Home />
          </Layout>
        </Route>
        {authorization && (
          <Route path="/create" exact>
            <CreateArticle />
          </Route>
        )}
        <Route path="/testeditor" exact>
          <div style={{padding: "50px"}}>
          <ContentEditor />
          </div>
          
        </Route>
        <Route path="/article/:id" exact>
          <Layout home="search" noKeywords={true}>
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
    </BrowserRouter>
  );
};

export default Router;
