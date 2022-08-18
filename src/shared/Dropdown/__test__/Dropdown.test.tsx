/**
 * @jest-environment jsdom
 */
// Если наш компонент использует какие-либо методы window, 
// то нужно использовать @jest-environment jsdom

import React from 'react';
import { shallow } from 'enzyme';
import { Dropdown } from '../Dropdown';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

// describe Описывает группу тестов, describe можно вкладывать друг в другу
// внутри тестов describe писать нельзя
describe('Dropdown', () => {
  test('should render', () => {
    const wrapper = shallow(<Dropdown children={<div></div>} button={<button></button>} />);
    // проверка на то, что мы смогли отрендерить компонент
    expect(wrapper).toBeDefined();
    // можем вывести в консоль результаты поиска
    // console.log(wrapper.find('div.container').debug())
    expect(wrapper.find('div.container').isEmptyRender()).toBeFalsy();
  })

  test('should render (snapshot)', () => {
    const wrapper = shallow(<Dropdown children={<div></div>} button={<button></button>} />);

    expect(wrapper).toMatchSnapshot();
  })
})