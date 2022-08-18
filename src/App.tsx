import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { Dropdown } from './shared/Dropdown';
import { Text } from './shared/Text';
import { Break } from './shared/Break';

function AppComponent() {
  return (
    <Layout>
      <Header />
      <Content>
        <CardsList />
        {/* <Text size={20} mobileSize={28} bold>Label1</Text>
        <Break size={8} mobileSize={16} top/>
        <Text size={20}>Label1</Text>
        <Break size={8} top/>
        <Text size={20} mobileSize={16}>Label1</Text> */}
      </Content>
    </Layout>
  )
}

export const App = hot(() => <AppComponent />);