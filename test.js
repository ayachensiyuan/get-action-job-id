const { Octokit } = require("@octokit/action")
const { createActionAuth } = require("@octokit/auth-action")

const run = async () => {
const auth = createActionAuth()
const authentication = await auth()
const octokit = new Octokit({
    auth: authentication.token
})

const repos = {
    owner: 'OfficeDev',
    repo: 'Teamsfx',
    run_id: '2996660435'
}

const { data } = await octokit.request(`/repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs`)

console.log(data)
}

run()