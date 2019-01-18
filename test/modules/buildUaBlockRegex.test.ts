import { expect } from 'code'
import * as Lab from 'lab'
import { buildUaBlockRegex } from '../../src/modules'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before

describe('buildUaBlockRegex', () => {
  describe('when passing in a valid Array', () => {
    let result: RegExp
    before(() => {
      result = buildUaBlockRegex(['A', 'B', 'C'])
    })

    it('expect a RegEx to be returned', () => {
      expect(result).to.exist()
      expect(result).to.equal(new RegExp(`^.*(a|b|c).*$`))
    })
  })

  describe('when passing in an empty Array', () => {
    let result: RegExp
    before(() => {
      result = buildUaBlockRegex([])
    })

    it('expect a RegEx to be returned', () => {
      expect(result).to.not.exist()
    })
  })
})
