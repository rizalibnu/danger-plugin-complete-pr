module.exports = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          { type: "docs", scope: "README", release: "patch" },
          { type: "refactor", scope: "core-*", release: "minor" },
          { type: "refactor", release: "patch" },
          { type: "style", release: "patch" },
          { scope: "no-release", release: false },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
};
