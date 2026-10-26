jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  function MockIcon({ name, ...props }) {
    return React.createElement(Text, props, name)
  }

  return { Ionicons: MockIcon }
})
