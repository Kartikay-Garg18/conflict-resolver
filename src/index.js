import { parseConflicts } from './parser.js';
import { formatFile } from './formatter.js';
import { commitResolutions } from './github.js';
import { resolveConlictsInFiles } from './resolver.js';
import simpleGit from 'simple-git';

async function resolveConflicts(options) {
    const { path, strategy, auto } = options;
    const git = simpleGit(path);

    const status = await git.status();

    if(!status.conflicted.length){
        return;
    }

    const conflictedFiles = status.conflicted;

    const parsedConflicts = await parseConflicts(conflictedFiles, path);

    const resolvedFiles = await resolveConlictsInFiles(parsedConflicts, { strategy, autoResolve: auto });

    await formatFile(resolvedFiles, path);

    if(auto){
        await commitResolutions(resolvedFiles, git);
    }

    return {
        resolvedCount : resolvedFiles.length,
        resolvedFiles : resolvedFiles.map(file => file.fileName),
    }
}

export {resolveConflicts}