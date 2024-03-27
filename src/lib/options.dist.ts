import type { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa'

const pkgVersion = '__PACKAGE_VERSION__'
const pkgName = '__PACKAGE_NAME__'

export function getOptions(options: FpjsClientOptions) {
  const clientOptions: FpjsClientOptions = {
    ...options,
    loadOptions: {
      ...options.loadOptions,
      integrationInfo: [...(options.loadOptions?.integrationInfo ?? []), `${pkgName}/${pkgVersion}`],
    },
  }

  return clientOptions
}
