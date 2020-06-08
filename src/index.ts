import {DangerDSLType} from 'danger/distribution/dsl/DangerDSL';
declare const danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;
export type Reporter = (message: string) => void;
import * as messages from './messages';

/**
 * Checks if the pull request request has at least one assignee.
 * @param reporter The reporter function if the check fails.
 */
export const checkAssignees = (reporter: Reporter = fail) => {
  const hasAssignees = danger.gitlab
    ? !!danger.gitlab.mr.assignee
    : !!danger.github.pr.assignee;

  if (!hasAssignees) {
    reporter(messages.noAssignee());
  }
};

/**
 * Checks if the description of the PR is long enough.
 * @param minimumLength The minimum length of the description.
 * @param reporter The reporter function if the check fails.
 */
export const checkDescription = (
  minimumLength: number = 10,
  reporter: Reporter = fail
) => {
  const description = danger.gitlab
    ? danger.gitlab.mr.description
    : danger.github.pr.body;
  const descriptionIsLongEnough = description.length >= minimumLength;

  if (!description) {
    reporter(messages.noDescription());
  }
  if (!descriptionIsLongEnough) {
    reporter(messages.descriptionNotLongEnough(minimumLength));
  }
};

/**
 * Checks if the pull request title matches a given pattern.
 * @param pattern The pattern to match.
 * @param patternMessage readable pattern message for reporter message.
 * @param reporter The reporter function if the check fails.
 */
export const checkTitle = (
  pattern: RegExp,
  patternMessage?: string,
  reporter: Reporter = fail
) => {
  const title = danger.gitlab ? danger.gitlab.mr.title : danger.github.pr.title;
  const titleIsValid = pattern.test(title);
  const isWIP = /(^WIP|wip|\[WIP\]|\[wip\])|(^%s$)/.test(title);

  if (isWIP) {
    message(messages.wip());
  }

  if (!titleIsValid) {
    reporter(messages.titleDoeNotMatch(patternMessage || pattern));
  }
};

/**
 * Checks if a pull request is too big.
 * @param maxSize The maximum changed files count to be valid
 * @param reporter The reporter function if the check fails.
 */
export const checkPRSize = (maxSize: number, reporter: Reporter = fail) => {
  const changesCount = Number(
    danger.gitlab
      ? danger.gitlab.mr.changes_count
      : danger.github.pr.changed_files
  );
  if (changesCount > maxSize) {
    reporter(messages.bigPR());
  }
};

/**
 * Checks if merge squash checked. (GitLab only)
 * @param reporter The reporter function if the check fails.
 */
export const checkMergeSquashChecked = (reporter: Reporter = fail) => {
  const squashChecked = danger.gitlab.mr.squash;

  if (!squashChecked) {
    reporter(messages.squashNotChecked());
  }
};

/**
 * Checks if delete source branch checked. (GitLab only)
 * @param reporter The reporter function if the check fails.
 */
export const checkDeleteSourceBranchChecked = (reporter: Reporter = fail) => {
  const deleteSourceBranchChecked = danger.gitlab.mr.force_remove_source_branch;

  if (!deleteSourceBranchChecked) {
    reporter(messages.deleteSourceBranchhNotChecked());
  }
};

/**
 * Github available plugins
 */
export const github = {
  checkAssignees,
  checkDescription,
  checkTitle,
  checkPRSize,
};

/**
 * GitLab available plugins
 */
export const gitlab = {
  checkAssignees,
  checkDescription,
  checkTitle,
  checkPRSize,
  checkMergeSquashChecked,
  checkDeleteSourceBranchChecked,
};
