const { App } = require('./src/App')
const app = App.createApplication()

app.listen(app.get('port'), () => {
  process.on('unhandledRejection', (exception) => {
    console.log('Unhandled Rejection:', exception)
    process.exit(1)
  })
  console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('mode')} mode`)
})

// module.exports = server
