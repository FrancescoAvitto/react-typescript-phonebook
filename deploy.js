
// deploy.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

try {
    console.log('Deploying to gh-pages...');

    // 1. Init git in dist
    process.chdir(distDir);
    execSync('git init');
    execSync('git checkout -b gh-pages');
    execSync('git add -A');
    execSync('git commit -m "deploy"');

    // 2. Push to remote
    // Retrieving remote URL from parent repo would be ideal, but let's assume origin for now or pass it.
    // Actually, let's hardcode the repo URL or get it from package.json if possible, 
    // but simpler is to allow the user or environment to set it. 
    // For this specific user, we saw the remote: github.com:FrancescoAvitto/react-typescript-phonebook.git

    const remoteUrl = 'git@github.com:FrancescoAvitto/react-typescript-phonebook.git';

    execSync(`git push -f ${remoteUrl} gh-pages`);

    console.log('Deployed successfully!');
} catch (e) {
    console.error('Deployment failed:', e.message);
    process.exit(1);
}
