const clone = require('lodash/cloneDeep')
const toKebabCase = require('lodash/kebabCase')

const PALETTE = require('../dist/colors.json')

const formatHex = require('../utilities/format-hex-value')

const colors = includeWhiteColor(PALETTE.colors).map(colorArray => {
  return colorArray.map(formatVariableEntry)
})

printStylesheet(colors)

function formatVariableEntry(colorObject) {
  const { name, value } = colorObject
  return `--muriel-${toKebabCase(name)}: ${formatHex(value)};`
}

function includeWhiteColor(colorArrays) {
  const arrays = clone(colorArrays)
  arrays.unshift([{ name: 'White', value: '#ffffff' }])
  return arrays
}

function printStylesheet(colorArrays) {
  const blocks = colorArrays.map(colorArray => {
    return colorArray.map(entry => `  ${entry}`).join(`\n`)
  })

  const contents = [
    `/* v${PALETTE.version} */`,
    `\n\n`,
    ':root {',
    `\n`,
    blocks.join(`\n\n`),
    `\n`,
    '}'
  ]

  console.log(contents.join(''))
}