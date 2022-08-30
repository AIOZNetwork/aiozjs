export const isRevisionFormat = (chainId: string) => /^.*[^\n-]-{1}[1-9][0-9]*$/.test(chainId);

export function parseChainId(chainId: string): number {
	if (!isRevisionFormat(chainId)) {
		// chainID is not in revision format, return 0 as default
		return 0;
	}
	const splitStr = chainId.split('-');
	const revision = parseInt(splitStr[splitStr.length-1])
	// sanity check: revision should always be not NaN since regex only allows numbers in last element
	if (isNaN(revision)) {
		throw `regex allowed non-number value as last split element for chainId: ${chainId}`
	}
	return revision
}