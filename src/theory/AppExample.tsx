import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from '../shared/Layout';
import { Header } from '../shared/Header';
import { Content } from '../shared/Content';
import { CardsList } from '../shared/CardsList';
import { MyList, GenericList } from '../shared/GenericList/GenericList';
import { generateId, generateRandomString } from '../utils/react/generateRandomIndex';
import { merge } from '../utils/js/merge';
import { useToken } from '../hooks/useToken';

const LIST = [
  {text: 'some'}, 
  {text: 'other some'}, 
  {text: 'some'},
].map(generateId)

function AppComponent() {
  const [list, setList] = React.useState(LIST);

  const handleItemClick = (id: string) => {
    console.log(id);
    setList(list.filter((item) => item.id != id))
  }

  const handleAdd = () => {
    setList(list.concat(generateId({ text: generateRandomString() })))
  }

  const [token] = useToken();

  return (
    <Layout>
      <Content>
        <CardsList />
        {/* 1 вариант */}
        {/* <MyList list={LIST} onClick={console.log}/> */}
        {/* 2 вариант - мы зададим каждому элементу свой handler */}
        <button onClick={handleAdd}>Add element</button>
        {/* <MyList list={list.map(merge({ onClick: handleItemClick }))} /> */}
        <GenericList list={list.map(merge({ onClick: handleItemClick }))} />
      </Content>
    </Layout>
  )
}

export const App = hot(() => <AppComponent />);