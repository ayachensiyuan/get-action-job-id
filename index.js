const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require("@octokit/action")
const { createActionAuth } = require("@octokit/auth-action")

const run = async () => {
  try {
    const run_id = core.getInput('run-id')
    const run_attempt = core.getInput('run-attempt')
    const { repo } = github.context

    const auth = createActionAuth()
    const authentication = await auth()

    const octokit = new Octokit({
      auth: authentication.token
    })

    const { data } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/attempts/${run_attempt}/jobs`)

    
    // find current job id from the list of jobs
    let target = ''
    // console.log(github.context)
    console.log(github)
    console.log(repo)
    for (let job of data.jobs) {
      const {data} = await octokit.request(`GET /repos/${owner}/${repo}/actions/jobs/${job_id}`)
      console.log(data)
      // console.log('job.id: ',job.id)
      // console.log('job.name: ',job.name)
      // console.log('github.context.job: ',github.context.job)
      if (github.context.job == job.name) {
        console.log(job.id)
        target = job.id
      }
    }

    // set id to output
    core.setOutput('jobId', JSON.stringify(target))


  } catch (error) {
    core.setFailed(error.message)
  }

}

run()

