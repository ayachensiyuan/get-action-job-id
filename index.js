const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require("@octokit/core");
const { retry } = require("@octokit/plugin-retry");
const { createActionAuth } = require("@octokit/auth-action")

async function getId(octokit, run_id, repo, per_page, job_name) {
  const { data: { total_count } } = await octokit.request(`GET /repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs`)
  let count = 0
  let target = ''
  console.log('total job: ', total_count)
  for (let page = 1; page <= Math.floor(total_count / per_page) + 1; page++) {
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
  if (count === 1)
    return target
  else
    return -1
}




const run = async () => {
  try {
    const { repo, runId: run_id } = github.context
    // user input job name
    const job_name = core.getInput('job-name', { required: true })

    const auth = createActionAuth()
    const authentication = await auth()

    const MyOctokit = Octokit.plugin(retry);
    const octokit = new MyOctokit({
      auth: authentication.token
    })
    console.log('finish init env.')
    const per_page = 100
    // get total number of jobs
    try {
      const target = await getId(octokit, run_id, repo, per_page, job_name)
      if (target === -1)
        core.setOutput('jobId', JSON.stringify('notUniqueId'))
      else
        // set id to output
        core.setOutput('jobId', JSON.stringify(target))
    } catch (error) {
      if (error.request.request.retryCount) {
        console.log(error)
        console.log(
          `request failed after ${error.request.request.retryCount} retries`
        );

        // try again
        const target = await getId(octokit, run_id, repo, per_page, job_name)
        if (target === -1)
          core.setOutput('jobId', JSON.stringify('notUniqueId'))
        else
          // set id to output
          core.setOutput('jobId', JSON.stringify(target))
      }
    }
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

run()

