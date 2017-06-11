/**
 * @param {RegExp} blockRegex - the regex to test against
 * @param {string} userAgent - the value to test
 */
const isBlockUa = (blockRegex: RegExp, userAgent: string): boolean =>
  blockRegex.test(userAgent.toLowerCase())

export {isBlockUa}
