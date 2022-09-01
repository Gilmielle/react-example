import React, { useEffect, useState } from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { applyMiddleware, legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer, saveToken } from './store/reducer';
import thunk from 'redux-thunk';
import { BrowserRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { Post } from './shared/Post';

const store = legacy_createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  store.dispatch<any>(saveToken());



  return (
    <>
      {mounted && (
        <BrowserRouter>
          <Layout>
            <Header />
            <Switch>
              <Route path='/posts'>
                <Content>
                  <CardsList />
                    <Route path='/posts/:id' >
                      <Post />
                    </Route>
                </Content>
              </Route>

              <Route exact path='/'>
                <Redirect to='/posts' />
              </Route>

              <Route path='/auth'>
                <Redirect to='/posts' />
              </Route>

              <Route path='*'>
                <div role='alert' style={{ textAlign: 'center' }}>404 — страница не найдена</div>
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      )}
    </>
  )
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));