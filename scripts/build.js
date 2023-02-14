const esbuild = require("esbuild");

esbuild.build({
    entryPoints: ['src/js/index.js'],
    outfile: 'dist/assets/redactoranchors.js',
    platform: 'browser',
    minify: true,
    bundle: true,
    watch: process.argv.includes('--watch'),
});
