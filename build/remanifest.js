/* eslint-disable no-console, import/no-extraneous-dependencies */
const { promises: { readdir, readFile, writeFile } } = require('fs');
const { join, resolve } = require('path');
const chokidar = require('chokidar');

const root = resolve(__dirname, '..');

const lsr = async (path) => {
  const files = [];
  const entries = await readdir(path, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    if (entry.isFile()) {
      files.push(join(path, entry.name));
    } else if (entry.isDirectory()) {
      const children = await lsr(join(path, entry.name));
      children.forEach((child) => {
        files.push(child);
      });
    }
  }));
  return files;
};

const remanifest = async () => {
  const manifestFile = join(root, 'manifest.json');
  const packageFile = join(root, 'package.json');

  const pkg = JSON.parse(await readFile(packageFile, { encoding: 'utf-8' }));
  if (pkg.name === 'chrome-ext-skeleton' || pkg.version === '0.0.0') {
    console.warn('Please update the project name and version in package.json');
  }

  const {
    web_accessible_resources: baseRes = [],
    ...baseManifest
  } = pkg.manifest;

  const manifest = {
    version: pkg.version,
    ...baseManifest,
    web_accessible_resources: Array.from(new Set([
      ...baseRes,
      ...await lsr('./src'),
    ])),
  };

  console.log(`Web-accessible:\n\t${manifest.web_accessible_resources.join('\n\t')}`);
  writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('Updated manifest.json');
};

if (resolve(__filename) === resolve(process.argv[1]) && process.argv[2] === '--watch') {
  (async () => {
    console.log('Watching');
    chokidar.watch('dir')
      .add(resolve(root, 'src'))
      .on('add', remanifest)
      .on('unlink', remanifest);
    chokidar.watch('file')
      .add(resolve(root, 'package.json'))
      .on('change', remanifest);
  })();
} else {
  remanifest();
}
