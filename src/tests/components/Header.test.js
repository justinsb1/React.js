// react-test-renderer allows you to render your components inside regular javascript code
import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    // const renderer = new ReactShallowRenderer();
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    // renderer.render(<Header />);
    const wrapper = shallow(<Header startLogout={() => { }}/>);
    expect(wrapper).toMatchSnapshot();
});


// should call startLogout on button click
test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
}); 