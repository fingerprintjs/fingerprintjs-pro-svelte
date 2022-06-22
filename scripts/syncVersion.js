/**
 * Dynamically replaces 'pkgVersion' and 'pkgName' variables in 'src/lib/options.ts' file,
 * because so far it seems that there is no way to import 'package.json' file in library in svelte kit.
 * */

import path from 'path';
import fs from 'fs';
import pkg from '../package.json' assert { type: 'json' };

const optionFiles = {
  target: path.resolve('./src/lib/options.ts'),
  dist: path.resolve('./src/lib/options.dist.ts'),
};

const contents = fs.readFileSync(optionFiles.dist, 'utf8').toString();

const newContents = contents
  .replace(/^(const pkgVersion =).*/gm, `const pkgVersion = '${pkg.version}'`)
  .replace(/^(const pkgName =).*/gm, `const pkgName = '${pkg.name}'`);

fs.writeFileSync(optionFiles.target, newContents);
