import {expect} from 'code'
import * as Lab from 'lab'
export const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const before = lab.before

import {buildUaBlockRegex} from '../../module'

describe('buildUaBlockRegex', () => {
  describe('when passing in a valid Array', () => {
    let result: RegExp
    before((done) => {
      result = buildUaBlockRegex(['A', 'B', 'C'])
      done()
    })

    it('expect a RegEx to be returned', (done) => {
      expect(result).to.exist()
      expect(result).to.equal(new RegExp(`^.*(a|b|c).*$`))
      done()
    })
  })

  describe('when passing in an empty Array', () => {
    let result: RegExp
    before((done) => {
      result = buildUaBlockRegex([])
      done()
    })

    it('expect a RegEx to be returned', (done) => {
      expect(result).to.not.exist()
      done()
    })
  })
})
