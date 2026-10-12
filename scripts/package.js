const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const manifest = require('../package.json');

const root = path.resolve(__dirname, '..');
const releaseVersion = manifest.tomlHilighterFork?.releaseVersion || manifest.version;
const outputDirectory = path.join(root, 'builds');
fs.mkdirSync(outputDirectory, { recursive: true });
const outputFile = path.join(outputDirectory, `toml-hilighter-${releaseVersion}.vsix`);
const result = spawnSync(process.execPath, [
    require.resolve('@vscode/vsce/vsce'), 'package', '--out', outputFile
], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status === null ? 1 : result.status;
