import * as Lab from '@hapi/lab'
import * as sinon from 'sinon'
import { mockRes } from 'sinon-express-mock'
import { respondToBlockedUa } from '../../src/modules'
import { loadEsmModule } from '../helpers/loadEsmModule'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before
let expect: any

before(async () => {
  const chai = await loadEsmModule('chai')
  const sinonChai = await loadEsmModule('sinon-chai')
  chai.use(sinonChai.default)
  expect = chai.expect
})

describe('index', () => {
  let res: mockRes
  let next: any

  describe('when the request contains a blocked user agent header', () => {
    before(() => {
      res = mockRes()
      next = sinon.spy()
    })

    describe('and no options are present', () => {
      const defaultMessage = 'Nothing to see here - move along please...'
      it(`expect the response to contain message "${defaultMessage}"`, () => {
        respondToBlockedUa(res)
        expect(res.status).to.be.calledWith(200)
        expect(res.json).to.be.calledWith({ message: defaultMessage })
        expect(next.notCalled)
      })
    })

    describe('and options contain html', () => {
      const html = '<h1>Let me make a bologna sandwich...</h1>'
      it(`expect the html to be rendered with "${html}"`, () => {
        respondToBlockedUa(res, { html })
        expect(res.status).to.be.calledWith(200)
        expect(res.send).to.be.calledWith(html)
        expect(next.notCalled)
      })
    })

    describe('and options contain text', () => {
      const text = 'Words hold no weight'
      it(`expect the html to be rendered with "${text}"`, () => {
        respondToBlockedUa(res, { text })
        expect(res.status).to.be.calledWith(200)
        expect(res.send).to.be.calledWith(text)
        expect(next.notCalled)
      })
    })
  })
})
