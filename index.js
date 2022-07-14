const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require("@octokit/action")

const run = async () => {
  try {
    const run_id = core.getInput('run-id')
    const token = core.getInput('repo-token')
    const { repo } = github.context


    const octokit = new Octokit({
      auth: token
    });

    const { response } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/attempts/${1}/jobs`);

    console.log(response)


  } catch (error) {
    core.setFailed(error.message);
  }

}

run()

