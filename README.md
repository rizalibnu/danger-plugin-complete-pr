# danger-plugin-pull-request

[![Build Status](https://travis-ci.org/rizalibnu/danger-plugin-pull-request.svg?branch=master)](https://travis-ci.org/rizalibnu/danger-plugin-pull-request)
[![npm version](https://badge.fury.io/js/danger-plugin-pull-request.svg)](https://badge.fury.io/js/danger-plugin-pull-request)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> A Danger plugin to verify the completion of a pull request. Currently support GitHub and GitLab.

## Usage

Install:

```sh
yarn add danger-plugin-pull-request --dev
```

At a glance:

_dangerfile.js_
```js
import * as pullRequest from 'danger-plugin-pull-request'

pullRequest.checkAssignees();
pullRequest.checkDescription(1000);
pullRequest.checkTitle(/^\[[A-Za-z]+-\d+\]/);
pullRequest.checkPRSize(50);
pullRequest.checkMergeSquashChecked(); // GitLab only
pullRequest.checkDeleteSourceBranchChecked(); // GitLab only
```

## API

### checkAssignees([reporter])
Checks is the current pull request has any assignees.

Arguments:

- [`reporter`] (_Function_): The reporter (`message`, `warn` or `fail`) to call if the pull request has no assignees.
  - Default value: `fail`

### checkDescription(minimumLength, [reporter])
Checks if the description of the pull request is long enough.

Arguments:

- `minimumLength` (_Number_): The minimum length for a description to be valid.
- [`reporter`] (_Function_): The reporter (`message`, `warn` or `fail`) to call if the pull request's description is too short.
  - Default value: `fail`

### checkTitle(pattern, patternMessage, [reporter])
Checks if the title of the pull request matches a given pattern.

Arguments:

- `pattern` (_RegExp_): The pattern to test the title with.
- `patternMessage` (_String_): Readable pattern message for reporter message.
- [`reporter`] (_Function_): The reporter (`message`, `warn` or `fail`) to call if the pull request's title is invalid.
  - Default value: `fail`

### checkPRSize(maxSize, [reporter])
Checks if a pull request is too big.

Arguments:

- `maxSize` (_Number_): The maximum changed files count to be valid.
- [`reporter`] (_Function_): The reporter (`message`, `warn` or `fail`) to call if the pull request's description is too short.
  - Default value: `fail`

### checkMergeSquashChecked([reporter])
Checks if merge squash checked. (GitLab only)

Arguments:

- [`reporter`] (_Function_): The reporter (`message`, `warn` or `fail`) to call if the pull request's description is too short.
  - Default value: `fail`

### checkDeleteSourceBranchChecked([reporter])
Checks if delete source branch checked. (GitLab only)

Arguments:

- [`reporter`] (_Function_): The reporter (`message`, `warn` or `fail`) to call if the pull request's description is too short.
  - Default value: `fail`

## Changelog

See the GitHub [release history](https://github.com/rizalibnu/danger-plugin-pull-request/releases).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
