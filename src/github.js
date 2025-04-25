import { Octokit } from '@octokit/rest';

function initGitHubClient(token) {
    return new Octokit({ auth: token });
}

async function commitResolutions(resolvedFiles, git) {
    await git.add(resolvedFiles.map(file => file.fileName));
    await git.commit('Resolved merge conflicts');
}

async function getPullRequest(client, options) {
    const { owner, repo, pull_number } = options;
    const pullRequest = await client.pulls.get({
        owner,
        repo,
        pull_number,
    });
    return pullRequest.data;
}

export {
    initGitHubClient,
    commitResolutions,
    getPullRequest,
}