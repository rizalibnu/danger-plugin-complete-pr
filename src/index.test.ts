import * as pullRequest from './index';
import * as messages from './messages';

declare const global: any;

describe('pull request plugin', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.message = jest.fn();
    global.fail = jest.fn();
    global.markdown = jest.fn();
  });

  afterEach(() => {
    global.warn = undefined;
    global.message = undefined;
    global.fail = undefined;
    global.markdown = undefined;
  });

  describe('checkAssignees', () => {
    it(`should call the reporter if the pr doesn\'t have an assignee`, () => {
      global.danger = {
        github: {pr: {assignee: null}},
      };

      pullRequest.github.checkAssignees();

      expect(global.fail).toHaveBeenCalledWith(messages.noAssignee());
    });

    it('should not call the reporter if the pr has an assignee', () => {
      global.danger = {
        github: {pr: {assignee: '@john.doe'}},
      };

      pullRequest.github.checkAssignees();

      expect(global.fail).not.toHaveBeenCalled();
    });
  });

  describe('checkDescription', () => {
    it(`should call the reporter if the pr's description is too short`, () => {
      global.danger = {
        github: {pr: {body: 'so short'}},
      };

      pullRequest.github.checkDescription(1000);

      expect(global.fail).toHaveBeenCalledWith(
        messages.descriptionNotLongEnough(1000)
      );
    });

    it(`should not call the reporter if the pr's description is long enough`, () => {
      global.danger = {
        github: {pr: {body: 'so looooong'}},
      };

      pullRequest.github.checkDescription(1);

      expect(global.fail).not.toHaveBeenCalled();
    });
  });

  describe('checkTitle', () => {
    const pattern = /^\[[A-Za-z]+-\d+\]/;

    it(`should call the reporter if the pr's title doesn't match the given pattern`, () => {
      global.danger = {
        github: {pr: {title: 'i am not going to match'}},
      };

      pullRequest.github.checkTitle(pattern);

      expect(global.fail).toHaveBeenCalledWith(
        messages.titleDoeNotMatch(pattern)
      );
    });

    it(`should not call the reporter if the pr's title matches the given pattern`, () => {
      global.danger = {
        github: {pr: {title: '[abc-123] i am going to match'}},
      };

      pullRequest.github.checkTitle(pattern);

      expect(global.fail).not.toHaveBeenCalled();
    });
  });
});
