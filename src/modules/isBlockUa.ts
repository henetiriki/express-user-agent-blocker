/**
 * Tests the user agent against the block regex
 * @param {RegExp} blockRegex - the regex to test against
 * @param {string} userAgent - the value to test
 * @return {boolean} true, if UA needs to be blocked, else false
 */
const isBlockUa = (blockRegex: RegExp, userAgent: string): boolean =>
  blockRegex.test(userAgent.toLowerCase())

export {isBlockUa}
