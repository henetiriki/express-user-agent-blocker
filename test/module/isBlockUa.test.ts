import {expect} from 'code'
import * as Lab from 'lab'
export const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const before = lab.before

import {isBlockUa} from '../../src/module'

describe('isBlockUa', () => {
  describe('when the regex is testing for a|b|c', () => {
    const regex: RegExp = new RegExp(`^.*(a|b|c).*$`)
    let result: boolean

    describe('and the user agent is A', () => {
      before((done) => {
        result = isBlockUa(regex, 'A')
        done()
      })

      it('expect the result to be "true"', (done) => {
        expect(result).to.equal(true)
        done()
      })
    })

    describe('and the user agent is D', () => {
      before((done) => {
        result = isBlockUa(regex, 'D')
        done()
      })

      it('expect the result to be "false"', (done) => {
        expect(result).to.equal(false)
        done()
      })
    })
  })
})
