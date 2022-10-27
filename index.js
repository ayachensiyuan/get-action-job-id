const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require("@octokit/core");
const { retry } = require("@octokit/plugin-retry");
const { createActionAuth } = require("@octokit/auth-action")

const run = async () => {
  try {
    const { repo, runId: run_id } = github.context
    // user input job name
    const job_name = core.getInput('job-name', { required: true })

    const auth = createActionAuth()
    const authentication = await auth()

    const MyOctokit = Octokit.plugin(retry);
    const octokit = new MyOctokit({
      auth: authentication.token,
      request: {retry:2 }
    })
    console.log('finish init env.')
    const per_page = 100
    // get total number of jobs
    const { data: {total_count} } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs`)
    let count = 0
    let target = ''
    console.log('total job: ', total_count)
    for (let page = 1; page <= Math.floor(total_count/per_page) + 1; page++) {
      const { data } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs?per_page=${per_page}&page=${page}`)
      for (const job of data.jobs) {
        // find current job id from the list of jobs
        if (job_name === job.name) {
          console.log('find match id is: ', job.id)
          count++
          target = job.id
        }
      }
    }
    if (count == 1)
      // set id to output
      core.setOutput('jobId', JSON.stringify(target))
    else
      core.setOutput('jobId', JSON.stringify('notUniqueId'))
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

run()

