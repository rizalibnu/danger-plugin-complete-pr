import {DangerDSLType} from 'danger/distribution/dsl/DangerDSL';
declare const danger: DangerDSLType;

const pullReqName = () => (danger.gitlab ? 'merge request' : 'pull request');

export const noAssignee = () =>
  `Please assign someone to merge this ${pullReqName()}, and optionally include people who should review.`;

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
  `This ${pullReqName()} size seems relatively large. If ${pullReqName()} contains multiple changes, split each into separate ${pullReqName()} will helps faster, easier review.`;

export const refactorCode = () => '🎉 Yay! Cheers for some code refactoring!';

export const squashNotChecked = () => 'Merge squash should checked';

export const deleteSourceBranchhNotChecked = () =>
  'Delete source branch should checked';

export const wip = () =>
  `This ${pullReqName()} marked as work in progress (WIP)`;
