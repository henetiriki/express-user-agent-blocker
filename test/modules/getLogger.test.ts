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
    before((done) => {
      result = getLogger('euab:getLogger.test')
      result.log = sinon.spy()
      done()
    })

    it('the log function should not be called because DEBUG is not set', (done) => {
      result('will not log because DEBUG is not set')
      expect(result.log.notCalled)
      done()
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
    before((done) => {
      result = getLogger('euab:getLogger.test', {logger})
      done()
    })

    it('the log function should be called with "this should log"', (done) => {
      result('this should log')
      expect(customLogger).to.be.calledWith('this should log')
      done()
    })
  })
})
