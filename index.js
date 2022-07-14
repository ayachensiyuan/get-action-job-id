const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");

const run = async () => {
  try {
    const run_id = core.getInput('run-id');
    console.log(run_id);
    const {payload} = github.context
    console.log(payload);

  
  
  //  const { response } = await octokit.request(`GET /repos/${owner}/${repo}/actions/runs/${run_id}/attempts/${attempt_number}/jobs`);
  
    //console.log(response)
  
  
  } catch (error) {
    core.setFailed(error.message);
  }

}

run()

