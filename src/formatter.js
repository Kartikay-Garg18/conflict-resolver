import { promises as fs } from 'fs';
import path from 'path';

async function formatFile(resolvedFiles, repoPath) {
    for(const file of resolvedFiles){
        const filePath = path.join(repoPath, file.fileName);
        const { resolvedContent } = file;
        
        try {
            await fs.writeFile(filePath, resolvedContent, 'utf-8');
        } catch (error) {
            console.error(`Error formatting ${file.fileName}: ${error.message}`);
        }

    }
}

export {
    formatFile,
};
