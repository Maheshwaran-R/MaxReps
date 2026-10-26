// Jest manual mock for the icon font. The real module renders nothing until the
// TTF loads, which never happens in the test environment.
const React = require('react')
const { Text } = require('react-native')

function Ionicons({ name, ...props }) {
  return React.createElement(Text, props, name)
}

Ionicons.font = {}

module.exports = Ionicons
module.exports.default = Ionicons
module.exports.__esModule = true
