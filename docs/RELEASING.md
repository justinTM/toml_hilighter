# Build and verify fork releases

The extension uses upstream's numeric patch version in `package.json`. GitHub release tags add build metadata (`v0.4.3+justinTM.1`) to identify the fork without changing SemVer precedence. VS Code requires `major.minor.patch` versions, so the VSIX manifest remains `0.4.3`. Keep the existing extension identifier for in-place replacement.

## Build

Use Node.js 22 or newer and npm. Packaging uses the exact VSCE version in the lockfile.

```sh
npm ci
TOML_TEST_LIVE_SCHEMAS=1 npm test
npm run package
```

The tests run in a disposable VS Code profile and workspace. Omit `TOML_TEST_LIVE_SCHEMAS=1` for offline schema fixtures. To use an installed VS Code executable, set `VSCODE_EXECUTABLE_PATH` to its Electron executable. The source archives include tests and proof assets; the VSIX contains runtime files and production dependencies.

## Release checklist

1. Confirm both fix branches are merged into fork `main`, update the dated changelog, and ensure `package.json`, the lockfile, and fork release metadata agree.
2. Run regression tests and package the VSIX. Inspect its manifest, production dependencies, and file list. Smoke-test the packaged extension in an isolated extension host.
3. Create an annotated SemVer tag on the verified commit, then generate source ZIP and tar.gz archives from that tag.
4. Generate `SHA256SUMS` for the VSIX and both source archives. Upload all four files to a GitHub draft release, download them again, and verify their checksums before publishing.

## Install and return upstream

Use **Install from VSIX…** in the local or Remote-SSH extension view. Command-line installs can use `code --install-extension <downloaded.vsix> --force`. Keep this extension's Auto Update disabled while using the fork. Once the fixes are released upstream, install that Marketplace release and re-enable Auto Update. An upstream `0.4.3` has the same numeric version as this VSIX; use `--force` or **Install Another Version…** to replace it explicitly.

This fork's releases are distributed on GitHub. The `publisher` field preserves the existing extension identifier; it does not imply a Marketplace publication by justinTM.
