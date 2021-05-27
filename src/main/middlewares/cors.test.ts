import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('should enable CORS', async () => {
    app.post('/test-cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('Access-Control-Allow-Methods', '*')
      .expect('Access-Control-Allow-Headers', '*')
  })
})
