/**
 * @param {string[]} userAgentToBlock
 */
const buildUaBlockRegex = (userAgentToBlock: string[]) =>
  userAgentToBlock.join('').trim().length > 0 ?
    new RegExp(`^.*(${userAgentToBlock.join('|').toLowerCase()}).*$`) : null

export {buildUaBlockRegex}
