# tiny-status

Status progresser for terminals.

```
npm i tiny-status
```

![tiny-status](https://user-images.githubusercontent.com/12686176/185763806-5d066931-614c-4ac5-b73b-06d16b1c4e0d.gif)

## Usage
```javascript
const tinyStatus = require('tiny-status')

const progresser = tinyStatus()

progresser('Starting stage')
setTimeout(() => progresser('Staging files (1/3)'), 1000)
setTimeout(() => progresser('Staging files (2/3)'), 2000)
setTimeout(() => progresser('Staging files (3/3)'), 3000)
setTimeout(() => progresser.success('Files are staged'), 4000)

setTimeout(() => progresser('Start again!'), 5000)
setTimeout(() => progresser.end('First stage was completed'), 6000)
setTimeout(() => progresser.success('File is saved successfully'), 6500)
setTimeout(() => progresser.error('An error occurred'), 7000)
setTimeout(() => progresser.warning('Caution with this operation'), 7500)
setTimeout(() => progresser.info('Time estimation is 2 minutes'), 8000)
```

```javascript
const progresser = tinyStatus({ frames: ['-'], color: 'gray' })
```

```javascript
const progresser = tinyStatus({ frames: ['-', '+', '-'], interval: 80 })
```

Default std stream used is `stderr`:
```javascript
const progresser = tinyStatus({ stream: process.stderr })
```

## License
MIT
