const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require("@octokit/action")
const { createActionAuth } = require("@octokit/auth-action");

const run = async () => {
  try {
    const run_id = core.getInput('run-id')
    const run_attempt = core.getInput('run-attempt')
    const { repo } = github.context

    const auth = createActionAuth()
    const authentication = await auth()

    const octokit = new Octokit({
      auth: authentication.token
    });

    const { data } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/attempts/${run_attempt}/jobs`);
    const jobIdList = []
    for (let job of data.jobs) {
      jobIdList.push(job.id)
    }
    console.log(github.context)


  } catch (error) {
    core.setFailed(error.message);
  }

}

run()

