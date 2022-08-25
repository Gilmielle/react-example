import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { useToken } from './hooks/useToken';
import { UserContextProvider } from './shared/context/userContext';
import { PostsContextProvider } from './shared/context/postsContext';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer, setToken } from './store';
import { useDispatch } from 'react-redux';

const store = legacy_createStore(rootReducer, composeWithDevTools());

function AppComponent() {
  const [token] = useToken();
  const dispatch = useDispatch();
  if (token !== 'undefined') {
    dispatch(setToken(token))
  }
  

  return (
    <UserContextProvider>
      <PostsContextProvider>
        <Layout>
          <Header />
          <Content>
            <CardsList />
          </Content>
        </Layout>
      </PostsContextProvider>
    </UserContextProvider>
  )
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));