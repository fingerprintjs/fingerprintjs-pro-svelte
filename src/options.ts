import type { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa';
import { version, name } from '../package.json';

export function getOptions(options: FpjsClientOptions) {
  const clientOptions: FpjsClientOptions = {
    ...options,
    loadOptions: {
      ...options.loadOptions,
      integrationInfo: [...(options.loadOptions?.integrationInfo ?? []), `${name}/${version}`],
    },
  };

  return clientOptions;
}
