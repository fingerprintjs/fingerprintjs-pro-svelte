import type { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa';

const pkgVersion = '<version>';
const pkgName = '<pkg_name>';

export function getOptions(options: FpjsClientOptions) {
  const clientOptions: FpjsClientOptions = {
    ...options,
    loadOptions: {
      ...options.loadOptions,
      integrationInfo: [...(options.loadOptions?.integrationInfo ?? []), `${pkgName}/${pkgVersion}`],
    },
  };

  return clientOptions;
}
