import ghpages from 'gh-pages';
import path from 'path';

console.log('Deploying to GitHub Pages...');
const cachePath = path.join(process.cwd(), '.gh-pages-cache');
console.log('Using cache path:', cachePath);

ghpages.publish('dist', {
    // Use a local, short path for the cache to avoid Windows "Filename too long" errors
    // caused by deeply nested paths in node_modules or long repo URLs with tokens.
    // caused by deeply nested paths in node_modules or long repo URLs with tokens.
    cache: cachePath,
    repo: `https://HaoIan:${process.env.GH_TOKEN}@github.com/HaoIan/Paws-and-Preferences.git`,
    dotfiles: true
}, function (err) {
    if (err) {
        console.error('Deployment failed:', err);
        process.exit(1);
    } else {
        console.log('Deployment complete!');
    }
});
