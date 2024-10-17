const net = require('net')

const logger = require('./logger')('server')

const server = net.createServer()
const port = 8000
const host = '127.0.0.1'

server.on('connection', socket => {
  logger.info('Client connected')
  socket.on('data', data => {
    const reqData = data.toString()
    logger.info(reqData)
    socket.write(`response ${reqData}`)
  })

  socket.on('end', () => {
    // for error type logging purpose, otherwise end event is not an error
    logger.error('Client disconnected') // should be logger.info('Client disconnected')
  })

  socket.on('error', err => {
    logger.error(err.message)
  })
})

server.listen(port, host, () => {
  logger.info(`Server running at ${host}:${port}`)
})
