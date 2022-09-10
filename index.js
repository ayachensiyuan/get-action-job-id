const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require("@octokit/action")
const { createActionAuth } = require("@octokit/auth-action")

const run = async () => {
  try {
    const { repo, runId: run_id } = github.context
    // user input job name
    const job_name = core.getInput('job-name', { required: true })

    const auth = createActionAuth()
    const authentication = await auth()

    const octokit = new Octokit({
      auth: authentication.token
    })
    const per_page = 100
    // get total number of jobs
    const { data: {total_count} } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs`)
    let count = 0
    let target = ''
    for (let page = 1; page <= Math.floor(total_count/per_page) + 1; page++) {
      const { data } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs?per_page=${per_page}&page=${page}`)
      for (const job of data.jobs) {
        // find current job id from the list of jobs
        if (job_name === job.name) {
          console.log(job.id)
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
    core.setFailed(error.message)
  }
}

run()

