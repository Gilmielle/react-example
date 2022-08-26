import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { PostsContextProvider } from './shared/context/postsContext';
import { applyMiddleware, legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer, saveToken, setToken } from './store/reducer';
import thunk from 'redux-thunk';

const store = legacy_createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {
  store.dispatch<any>(saveToken());

  return (
    <PostsContextProvider>
      <Layout>
        <Header />
        <Content>
          <CardsList />
        </Content>
      </Layout>
    </PostsContextProvider>
  )
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));