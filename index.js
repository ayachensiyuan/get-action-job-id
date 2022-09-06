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

    const { data } = await octokit.request(`/repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs`)
    
    
    let target = ''
    let count = 0
    
    for (let job of data.jobs) {
      console.log(job.toString())
      // find current job id from the list of jobs
      if (job_name == job.name) {
        console.log(job.id)
        count++
        target = job.id
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

