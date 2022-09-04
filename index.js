const streamCursor = require('stream-cursor')
const crayon = require('tiny-crayon')

const dots = ['⠋', '⠙', '⠚', '⠒', '⠂', '⠂', '⠒', '⠲', '⠴', '⠦', '⠖', '⠒', '⠐', '⠐', '⠒', '⠓', '⠋']
const symbols = [crayon.green('✔'), crayon.red('✖'), crayon.yellow('⚠'), crayon.blue('ℹ')]

module.exports = function tinyStatus (opts = {}) {
  const interval = opts.interval || 80
  const color = opts.color || 'cyan'
  const frames = opts.frames || dots
  const cursor = streamCursor(opts.stream || process.stderr)
  let rotate = 0
  let timer = null
  let prev = ''

  progresser.end = function (state) {
    ontick(true, '', state)
    rotate = 0
  }

  progresser.success = ontick.bind(null, true, symbols[0])
  progresser.error = ontick.bind(null, true, symbols[1])
  progresser.warning = ontick.bind(null, true, symbols[2])
  progresser.info = ontick.bind(null, true, symbols[3])

  return progresser

  function progresser (state) {
    if (!timer) timer = setInterval(ontick, interval)
    prev = state
    ontick()
  }

  function ontick (end, symbol = frame(), state) {
    const prefix = symbol ? (crayon[color](symbol) + ' ') : ''

    if (!end) {
      cursor(prefix + prev)
    } else {
      cursor.end(prefix + (state || prev))

      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }

  function frame () {
    return frames[rotate++ % frames.length]
  }
}
