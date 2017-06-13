import * as chai from 'chai'
import * as Lab from 'lab'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

export const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = chai.expect

chai.use(sinonChai)

import * as userAgentBlocker from '../src/index'

describe('index', () => {
  let req: mockReq
  let res: mockRes
  let next: any

  describe('when the request contains a blocked user agent header', () => {
    before((done) => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
        },
      })
      res = mockRes()
      next = sinon.spy()

      done()
    })

    it('expect the response to contain message "Nothing to see here - move along please..."', (done) => {
      userAgentBlocker(['Baiduspider'])(req, res, next)
      expect(res.json).to.be.calledWith({message: 'Nothing to see here - move along please...'})
      expect(next.notCalled)
      done()
    })
  })

  describe('when the request contains a non-blocked user agent header', () => {
    before((done) => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      })
      res = mockRes()
      next = sinon.spy()

      done()
    })

    it('expect the next function to be called', (done) => {
      userAgentBlocker(['Baiduspider'])(req, res, next)
      expect(res.json).to.not.be.calledWith({message: 'Nothing to see here - move along please...'})
      expect(next.called)
      done()
    })
  })

  describe('when the Express UA Blocker added without any blocked user agents', () => {
    before((done) => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      })
      res = mockRes()
      next = sinon.spy()

      done()
    })

    it('expect the next function to be called', (done) => {
      userAgentBlocker([])(req, res, next)
      expect(res.json).to.not.be.calledWith({message: 'Nothing to see here - move along please...'})
      expect(next.called)
      done()
    })
  })
})
