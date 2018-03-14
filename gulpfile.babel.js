// Copyright (C) 2018 Scott Wade <sc0ttwad3@gmail.com>
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 "scripts": {
    "clean": "rimraf ./build",
    "build": "run-s clean build:babel",
    "build:babel": "babel src --out-dir build --source-maps inline",
    "watch": "run-s clean watch:babel",
    "watch:babel": "babel src --out-dir build --source-maps inline --watch",
    "start": "node build/index.js",
    "test": "./node_modules/.bin/jest --forceExit",
    "cover": "./node_modules/.bin/jest --coverage --coverageDirectory=coverage",
    "pretty-quick": "pretty-quick --staged",
    "precommit": "run-s pretty-quick"
  },
 */

import babel from 'gulp-babel';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import fs from 'fs';
import git from 'gulp-git';
import bump from 'gulp-bump';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import sourcemaps from 'gulp-sourcemaps';
import lazypipe from 'lazypipe';
import prettier from 'gulp-prettier';
import tagVersion from 'gulp-tag-version';

const TEST = ['test/*.js'];
const SOURCE = ['src/**/*.js'];

const ESLINT_OPTION = {
  rules: {
    'no-use-before-define': 0,
    'no-new': 0,
    'no-native-reassign': 0,
    'no-lone-blocks': 0,
    strict: 0,
    bitwise: 0,
    curly: 0,
    eqeqeq: 0,
    camelcase: 0,
    'dot-notation': 0,
    'eol-last': 0,
    indent: 0,
    'linebreak-style': 0,
    'no-extra-boolean-cast': 0,
    'no-console': 0,
    'no-constant-condition': 0,
    'no-mixed-requires': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-undef': 0,
    'no-undef-init': 0,
    'no-unreachable': 0,
    'no-extra-strict': 0,
    'no-unused-vars': 0,
    'no-unsafe-finally': 0,
    'no-loop-func': 0,
    'comma-spacing': 0,
    quotes: 0,
    semi: 0,
    'space-infix-ops': 0,
    'keyword-spacing': 0,
    'semi-spacing': 0,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-extra-semi': 0,
    'no-redeclare': 0,
    'no-empty': 0
  },
  ecmaFeatures: {
    jsx: false,
    modules: true
  },
  env: {
    commonjs: true,
    node: true,
    es6: true
  }
};

const BABEL_OPTIONS = JSON.parse(fs.readFileSync('.babelrc', {encoding: 'utf8'}));

const build = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(babel, BABEL_OPTIONS)
  .pipe(sourcemaps.write)
  .pipe(gulp.dest, 'build');

gulp.task('build-for-watch', function() {
  return gulp
    .src(SOURCE)
    .pipe(plumber())
    .pipe(build());
});

let inc = importance =>
  gulp
    .src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps package version'))
    .pipe(filter('package.json'))
    .pipe(
      tagVersion({
        prefix: ''
      })
    );

gulp.task('default', () => {
  gulp
    .src('*.js')
    .pipe(prettier({useFlowParser: true}))
    .pipe(gulp.dest('./dist'));
});
