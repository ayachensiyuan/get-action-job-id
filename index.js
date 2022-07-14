const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const run_id = core.getInput('run-id');
  console.log(run_id);

} catch (error) {
  core.setFailed(error.message);
}
