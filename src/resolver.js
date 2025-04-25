import inquirer from 'inquirer';

function smartMerge(ours, theirs){

    if(!ours || !theirs) return ours || theirs;

    const mergedLines = [...ours, '\n//---MERGED---\n', ...theirs];

    return mergedLines;
}

async function applyStrategy(conflict, strategy) {
    switch(strategy) {
        case 'ours': return conflict.ours;
        case 'theirs': return conflict.theirs;
        case 'merge' : return smartMerge(conflict.ours, conflict.theirs);
        case 'manual': return await manualEdit(conflict.ours, conflict.theirs);
        default: return conflict.ours;
    }
}

async function manualEdit(ours, theirs) {
    const answer = await inquirer.prompt([{
        type: 'editor',
        name: 'resolution',
        message: 'Edit the resolution manually:',
        default: [
            '---OUR CHANGES---',
            ...ours,
            '---THEIR CHANGES---',
            ...theirs,
            '---EDIT BELOW THIS LINE---',
            ...ours,
        ].join('\n'),
    }])

    const editedContent = answer.resolution.split('\n');
    const startIndex = editedContent.indexOf('---EDIT BELOW THIS LINE---') + 1;
    return editedContent.slice(startIndex).filter(line => line.trim() !== '');
}

async function askUserForResolution(conflict, fileName){
    const { ours, theirs } = conflict;
    const choices = [
        { name: 'Keep our changes', value: 'ours' },
        { name: 'Keep their changes', value: 'theirs' },
        { name: 'Merge changes', value: 'merge' },
        { name: 'Edit manually', value: 'manual' },
    ];

    const answer = await inquirer.prompt([{
        type: 'list',
        name: 'resolution',
        message: `Choose resolution for conflict in ${fileName}:`,
        choices: choices,
    }])

    switch(answer.resolution) {
        case 'ours': return ours;
        case 'theirs': return theirs;
        case 'merge' : return smartMerge(ours, theirs);
        case 'manual':  return await manualEdit(ours, theirs);
        default: return ours;
    }
}

async function resolveFileConflicts(file, strategy, autoResolve) {
    const { conflicts, originalContent } = file;
    let resolvedContent = originalContent;

    for(let i=conflicts.length-1; i>=0; i--){
        const conflict = conflicts[i];
        let resolution;
        if(autoResolve){
            resolution  = await applyStrategy(conflict, strategy);
        } else{
            resolution = await askUserForResolution(conflict, file.filename);
        }

        const contentLines = resolvedContent.split('\n');
        contentLines.splice(conflict.start, conflict.end - conflict.start + 1, ...resolution);
        resolvedContent = contentLines.join('\n');
    }

    return resolvedContent;
}

async function resolveConlictsInFiles(parsedFiles, options) {
    const { strategy, autoResolve } = options;
    const resolvedFiles = [];

    for(const file of parsedFiles){
        const resolvedContent = await resolveFileConflicts(file, strategy, autoResolve);

        resolvedFiles.push({
            fileName: file.fileName,
            resolvedContent,
            originalContent: file.originalContent,
        })
    }

    return resolvedFiles;
}

export { resolveConlictsInFiles };