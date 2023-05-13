import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'

test('renders learn react link', () => {
  const wrapper = renderer.create(<App />).toJSON()
  expect(wrapper).toMatchSnapshot()
})
