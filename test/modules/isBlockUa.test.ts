import { expect } from 'code'
import * as Lab from 'lab'
import { isBlockUa } from '../../src/modules'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before

describe('isBlockUa', () => {
  describe('when the regex is testing for a|b|c', () => {
    const regex: RegExp = new RegExp(`^.*(a|b|c).*$`)
    let result: boolean

    describe('and the user agent is A', () => {
      before(() => {
        result = isBlockUa(regex, 'A')
      })

      it('expect the result to be "true"', () => {
        expect(result).to.equal(true)
      })
    })

    describe('and the user agent is D', () => {
      before(() => {
        result = isBlockUa(regex, 'D')
      })

      it('expect the result to be "false"', () => {
        expect(result).to.equal(false)
      })
    })
  })
})
