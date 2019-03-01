// react-test-renderer allows you to render your components inside regular javascript code
import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    // const renderer = new ReactShallowRenderer();
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    // renderer.render(<Header />);
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});
