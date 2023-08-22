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
function renameFile(filePath, search, replace) {
  const directory = path.dirname(filePath); // extracts directory portion of file path, excluding filename itself
  const fileName = path.basename(filePath); // extracts base name (last portion) of a file path

  const newFileName = fileName.replace(search, replace); // looks for substring "search" and replaces it with "replace"
  const newFilePath = path.join(directory, newFileName); // create new file path for newly named file

  try {
    fs.rename.Sync(filePath, newFilePath); // renames file using old file path and new file path
    console.log(`Renamed ${fileName} to ${newFileName}`);
  } catch (error) {
    console.error(`Error renaming ${fileName}: ${error.message}`);
  }
}

// Bulk rename files in directory
function renameFiles(directory, search, replace) {
  const files = fs.readdirSync(directory); // scans directory's files

  for (const file of files) {
    const filePath = path.join(directory, file); // create file path
    renameFile(filePath, search, replace);
  }
}
