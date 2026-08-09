export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'ref',
        'perf',
        'docs',
        'test',
        'build',
        'ci',
        'chore',
        'style',
        'meta',
        'license',
        'revert',
      ],
    ],
    'header-max-length': [2, 'always', 100],
  },
};
