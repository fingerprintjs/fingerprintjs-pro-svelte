import type { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa';

// TODO Dynamic value
const pkgVersion = '0.0.0';
const pkgName = '@fingerprintjs/fingerprintjs-pro-svelte';

export function getOptions(options: FpjsClientOptions) {
	const clientOptions: FpjsClientOptions = {
		...options,
		loadOptions: {
			...options.loadOptions,
			integrationInfo: [...(options.loadOptions?.integrationInfo ?? []), `${pkgName}/${pkgVersion}`]
		}
	};

	return clientOptions;
}
