const chainIdRegex = /^.*[^\n-]-{1}([1-9][0-9]*)$/;

export function parseChainIdRevision(chainId: string): number {
  if (!chainIdRegex.test(chainId)) {
    return 0;
  }
  const splitStr = chainId.split("-");
  return parseInt(splitStr[splitStr.length - 1], 10);
}
