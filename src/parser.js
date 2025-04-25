import { promises as fs } from 'fs';
import path from 'path';

function findConflicts(fileContent){
    const conflicts = [];
    const lines = fileContent.split('\n');

    let inConflict = false;
    let currentConflict = null;

    for(let i=0; i<lines.length; i++){
        let line = lines[i];

        if(line.startsWith('<<<<<<<')){
            inConflict = true;
            currentConflict = {
                start : i,
                ours: [],
                theirs: [],
                separator: -1,
                end: -1,
            }
        } else if(line.startsWith('=======') && inConflict){
            currentConflict.separator = i;
        } else if(line.startsWith('>>>>>>>') && inConflict){
            inConflict = false;
            currentConflict.end = i;
            conflicts.push(currentConflict);
        } else if(inConflict){
            if(currentConflict.separator === -1){
                currentConflict.ours.push(line);
            } else {
                currentConflict.theirs.push(line);
            }
        }
    }

    return conflicts;
}

async function parseConflicts(conflictedFiles, repoPath){
    const parsedFiles = [];
    for(const fileName of conflictedFiles){
        const filePath = path.join(repoPath, fileName);
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const conflicts = findConflicts(fileContent);

        parsedFiles.push({
            fileName,
            conflicts,
            originalContent: fileContent,
        })
    }

    return parsedFiles;
}

export { parseConflicts }