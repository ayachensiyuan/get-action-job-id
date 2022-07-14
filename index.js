const core = require('@actions/core');
const github = require('@actions/github');

try {
  const run_id = core.getInput('run-id');
  console.log(run_id);
  const repo = github.context

} catch (error) {
  core.setFailed(error.message);
}
