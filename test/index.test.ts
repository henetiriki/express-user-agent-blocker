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

import * as blocker from '../src/index'

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

    describe('and no options are present', () => {
      const defaultMessage = 'Nothing to see here - move along please...'
      it(`expect the response to contain message "${defaultMessage}"`, (done) => {
        blocker(['Baiduspider'])(req, res, next)
        expect(res.status).to.be.calledWith(200)
        expect(res.json).to.be.calledWith({message: defaultMessage})
        expect(next.notCalled)
        done()
      })
    })

    describe('and options contain html', () => {
      const html = '<h1>Let me make a bologna sandwich...</h1>'
      it(`expect the html to be rendered with "${html}"`, (done) => {
        blocker(['Baiduspider'], {html})(req, res, next)
        expect(res.status).to.be.calledWith(200)
        expect(res.send).to.be.calledWith(html)
        expect(next.notCalled)
        done()
      })
    })

    describe('and options contain text', () => {
      const text = 'Words hold no weight'
      it(`expect the html to be rendered with "${text}"`, (done) => {
        blocker(['Baiduspider'], {text})(req, res, next)
        expect(res.status).to.be.calledWith(200)
        expect(res.send).to.be.calledWith(text)
        expect(next.notCalled)
        done()
      })
    })
  })

  describe('when the request contains a non-blocked user agent header', () => {
    before((done) => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      })
      res = sinon.spy()
      next = sinon.spy()

      done()
    })

    it('expect the next function to be called', (done) => {
      blocker(['Baiduspider'])(req, res, next)
      expect(res.notCalled)
      expect(next.calledonce)
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
      res = sinon.spy()
      next = sinon.spy()

      done()
    })

    it('expect the next function to be called', (done) => {
      blocker([])(req, res, next)
      expect(res.notCalled)
      expect(next.calledonce)
      done()
    })
  })
})
