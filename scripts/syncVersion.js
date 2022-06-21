import { name, version } from '../package.json';
import path from 'path';
import fs from 'fs';

const optionsFile = path.resolve('../src/lib/options.ts');

const contents = fs.readFileSync(optionsFile, 'utf8');
