import { expect } from '@hapi/code'
import * as Lab from '@hapi/lab'
import * as MockReq from 'mock-req'
import { readUa } from '../../src/modules'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before

describe('readUa', () => {
  let req: MockReq
  let result: string

  describe('when the request contains a user agent header', () => {
    before(() => {
      req = new MockReq({
        headers: {
          'user-agent': ' A ',
        },
      })
      result = readUa(req)
    })

    it('expect the result to be "A"', () => {
      expect(result).to.exist()
      expect(result).to.equal('A')
    })
  })

  describe('when the request doesn\'t contain a user agent header', () => {
    before(() => {
      req = new MockReq()
      result = readUa(req)
    })

    it('expect the result to be ""', () => {
      expect(result).to.exist()
      expect(result).to.equal('')
    })
  })
})
