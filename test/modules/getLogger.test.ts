import * as chai from 'chai'
import * as Lab from 'lab'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import {Log} from '../../src/index.d'
import {getLogger} from '../../src/modules'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = chai.expect

chai.use(sinonChai)

describe('getLogger', () => {
  describe('when creating a default logger', () => {
    let result: any
    before(() => {
      result = getLogger('euab:getLogger.test')
      result.log = sinon.spy()
    })

    it('the log function should not be called because DEBUG is not set', () => {
      result('will not log because DEBUG is not set')
      expect(result.log.notCalled)
    })
  })

  describe('when creating a default logger', () => {
    const customLogger = sinon.spy()
    const logger: Log = {
      log: (message: string) => {
        customLogger(message)
      },
    }
    let result: any
    before(() => {
      result = getLogger('euab:getLogger.test', {logger})
    })

    it('the log function should be called with "this should log"', () => {
      result('this should log')
      expect(customLogger).to.be.calledWith('this should log')
    })
  })
})
