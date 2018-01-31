<img src="https://tse4.mm.bing.net/th?id=OIP.kinfImMcVjQ7kp0vqNVygwFWC2&w=273&h=160&c=7&qlt=90&o=4&dpr=2.5&pid=1.7">

Need to use 

```
<span>Made with ☕️ by <a href="http://www.georgehastings.com">George Hastings</a></span>
```

# node-ts-scaffold

A [typescript](https://www.typescriptlang.org/) starter for building node-based project and typescript libraries:

## Get started

## Development zen

This starter includes a watch task which makes development faster and more interactive.

## View test coverage

To generate and view test coverage, run:
```bash
yarn cov
```

This will create an HTML report of test coverage – source-mapped back to Typescript – and open it in your default browser.

<p align="center">
  <img height="600" alt="source-mapped typescript test coverage example" src="https://cloud.githubusercontent.com/assets/904007/22909301/5164c83a-f221-11e6-9d7c-72c924fde450.png">
</p>

## Generate/update changelog & tag release

This project is tooled for [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

```bash
# bump package.json version, update CHANGELOG.md, git tag the release
yarn changelog
```

## One-step publish preparation script

## Notes

### Multiple builds (`main`, `module`, and `browser`)

### Dependency on `tslib`

By default, this project requires [tslib](https://github.com/Microsoft/tslib) as a dependency. This is the recommended way to use Typescript's es6 &amp; es7 transpiling for sizable projects, but you can remove this dependency by removing the `importHelpers` compiler option in `tsconfig.json`. Depending on your usage, this may increase the size of your library significantly, as the Typescript compiler will inject it's helper functions directly into every file which uses them. (See also: [`noEmitHelpers` &rarr;](https://www.typescriptlang.org/docs/handbook/compiler-options.html))

### Targeting older environments

By default, this library targets environments with native (or already-polyfilled) support for es6 features. If your library needs to target Internet Explorer, outdated Android browsers, or versions of Node older than v4, you may need to change the `target` in `tsconfig.json` to `es5` (rather than `es6`) and bring in a Promise polyfill (such as [es6-promise](https://github.com/stefanpenner/es6-promise)).

It's a good idea to maintain 100% unit test coverage, and always test in the environments you target.
