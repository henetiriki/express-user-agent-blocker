import * as Lab from '@hapi/lab'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as blocker from '../src/index'

export const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = chai.expect

chai.use(sinonChai)

describe('index', () => {
  let req: mockReq
  let res: mockRes
  let next: any

  describe('when the request contains a blocked user agent header', () => {
    before(() => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
        },
      })
      res = mockRes()
      next = sinon.spy()
    })

    describe('and no options are present', () => {
      const defaultMessage = 'Nothing to see here - move along please...'
      it(`expect the response to contain message "${defaultMessage}"`, () => {
        blocker(['Baiduspider'])(req, res, next)
        expect(res.status).to.be.calledWith(200)
        expect(res.json).to.be.calledWith({ message: defaultMessage })
        expect(next.notCalled)
      })
    })

    describe('and options contain html', () => {
      const html = '<h1>Let me make a bologna sandwich...</h1>'
      it(`expect the html to be rendered with "${html}"`, () => {
        blocker(['Baiduspider'], { html })(req, res, next)
        expect(res.status).to.be.calledWith(200)
        expect(res.send).to.be.calledWith(html)
        expect(next.notCalled)
      })
    })

    describe('and options contain text', () => {
      const text = 'Words hold no weight'
      it(`expect the html to be rendered with "${text}"`, () => {
        blocker(['Baiduspider'], { text })(req, res, next)
        expect(res.status).to.be.calledWith(200)
        expect(res.send).to.be.calledWith(text)
        expect(next.notCalled)
      })
    })
  })

  describe('when the request contains a non-blocked user agent header', () => {
    before(() => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      })
      res = sinon.spy()
      next = sinon.spy()
    })

    it('expect the next function to be called', () => {
      blocker(['Baiduspider'])(req, res, next)
      expect(res.notCalled)
      expect(next.calledonce)
    })
  })

  describe('when the Express UA Blocker added without any blocked user agents', () => {
    before(() => {
      req = mockReq({
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      })
      res = sinon.spy()
      next = sinon.spy()
    })

    it('expect the next function to be called', () => {
      blocker([])(req, res, next)
      expect(res.notCalled)
      expect(next.calledonce)
    })
  })
})
