#!/usr/bin/env node

// Import Modules
const fs = require("fs");
const path = require("path");
const { program } = require("commander");

// Define CLI program
program
  .version("1.0.0")
  .description("Bulk rename files in directory")
  .requiredOption("-i, --input <path>", "Input directory containing files")
  .option("-p, --prefix <prefix>", "Prefix for the new filenames")
  .parse(process.argv);

// Parse command line arguments
const { input, prefix } = program.opts();

// Check if input exists
if (!fs.existsSync(input)) {
  console.error("Input directory does not exist");
  process.exit(1);
}

// Rename File

// Bulk rename files in directory
