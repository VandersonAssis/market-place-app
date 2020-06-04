import { ExpansionPanel } from '@material-ui/core';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import AddNewProduct from '../AddNewProduct';
import ErrorAlert from '../../ui/ErrorAlert';
import useRuler, { initializeRuler, validate, allFieldsValid } from '../../hooks/useRuler';
jest.mock('../../hooks/useRuler');

configure({ adapter: new Adapter() });

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

useRuler.mockReturnValue({
  initializeRuler: jest.fn(),
  validate: jest.fn(),
  allFieldsValid: jest.fn(() => { return false })
});

test('should render one ExpansionPanel', () => {
  let wrapper = shallow(<AddNewProduct />);
  expect(wrapper.find(ExpansionPanel)).toHaveLength(1);
});

test('should render one ErrorAlert', () => {
  let wrapper = shallow(<AddNewProduct />);
  expect(wrapper.find(ErrorAlert)).toHaveLength(1);
});

test('should have an ErrorPopAnchor for each input field', () => {
  let wrapper = shallow(<AddNewProduct />);
  let textFieldsQuantity = wrapper.find('.text-field').length;
  expect(wrapper.find("[data-test='error-pop-anchor']")).toHaveLength(textFieldsQuantity);
});

test('name input changes upon change on the input', () => {
  const setStateMock = jest.fn();
  React.useState = jest.fn(() => ["", setStateMock]);

  let wrapper = shallow(<AddNewProduct />);
  const input = wrapper.find("[data-test='input-entered-name']");

  input.simulate('change', { target: { value: 'product test' } });
  expect(setStateMock).toHaveBeenCalledWith('product test');
});

test('model input changes upon change on the input', () => {
  const setStateMock = jest.fn();
  React.useState = jest.fn(() => ["", setStateMock]);

  let wrapper = shallow(<AddNewProduct />);
  const input = wrapper.find("[data-test='input-entered-model']");

  input.simulate('change', { target: { value: 'model test' } });
  expect(setStateMock).toHaveBeenCalledWith('model test');
});

test('price input changes upon change on the input', () => {
  const setStateMock = jest.fn();
  React.useState = jest.fn(() => ["", setStateMock]);

  let wrapper = shallow(<AddNewProduct />);
  const input = wrapper.find("[data-test='input-entered-price']");

  input.simulate('change', { target: { value: 11 } });
  expect(setStateMock).toHaveBeenCalledWith(11);
});

test('quantity input changes upon change on the input', () => {
  const setStateMock = jest.fn();
  React.useState = jest.fn(() => ["", setStateMock]);

  let wrapper = shallow(<AddNewProduct />);
  const input = wrapper.find("[data-test='input-entered-quantity']");

  input.simulate('change', { target: { value: '55' } });
  expect(setStateMock).toHaveBeenCalledWith('55');
});

test('description input changes upon change on the input', () => {
  const setStateMock = jest.fn();
  React.useState = jest.fn(() => ["", setStateMock]);

  let wrapper = shallow(<AddNewProduct />);
  const input = wrapper.find("[data-test='input-entered-description']");

  input.simulate('change', { target: { value: 'description test' } });
  expect(setStateMock).toHaveBeenCalledWith('description test');
});