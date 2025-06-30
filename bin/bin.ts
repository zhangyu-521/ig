#!/usr/bin/env node

import { CLI } from '../src/cli';

const cli = new CLI();
cli.run().catch((error: Error) => {
    console.error('Error:', error.message);
    process.exit(1);
});
