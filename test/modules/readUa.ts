import {expect} from 'code'
import * as Lab from 'lab'
import * as MockReq from 'mock-req'

import {readUa} from '../../src/modules'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before

describe('readUa', () => {
  let req: MockReq
  let result: string

  describe('when the request contains a user agent header', () => {
    before((done) => {
      req = new MockReq({
        headers: {
          'user-agent': ' A ',
        },
      })
      result = readUa(req)
      done()
    })

    it('expect the result to be "A"', (done) => {
      expect(result).to.exist()
      expect(result).to.equal('A')
      done()
    })
  })

  describe('when the request doesn\'t contain a user agent header', () => {
    before((done) => {
      req = new MockReq()
      result = readUa(req)
      done()
    })

    it('expect the result to be ""', (done) => {
      expect(result).to.exist()
      expect(result).to.equal('')
      done()
    })
  })
})
