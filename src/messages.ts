import {DangerDSLType} from 'danger/distribution/dsl/DangerDSL';
declare const danger: DangerDSLType;

const pullReqName = () => (danger.gitlab ? 'merge request' : 'pull request');

export const noAssignee = () =>
  `There are no assignees to this ${pullReqName()}.`;

export const noDescription = () =>
  `This ${pullReqName()} does not have a description.`;

export const descriptionNotLongEnough = (
  minimumLength: number
) => `This ${pullReqName()} description is too short.
It should be contain at least ${minimumLength} characters.`;

export const titleDoeNotMatch = (pattern: RegExp | string) =>
  `This ${pullReqName()} title does not match the following pattern: ${
    pattern instanceof RegExp ? `\`${pattern}\`` : pattern
  }`;

export const bigPR = () =>
  `Big ${pullReqName()} better split into several ${pullReqName()}`;

export const refactorCode = () => '🎉 Yay! Cheers for some code refactoring!';

export const squashNotChecked = () => 'Merge squash should checked';

export const deleteSourceBranchhNotChecked = () =>
  'Delete source branch should checked';

export const wip = () =>
  `This ${pullReqName()} marked as work in progress (WIP)`;
