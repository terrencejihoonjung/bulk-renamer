#!/usr/bin/env node

// Import Modules
const fs = require("fs");
const path = require("path");
const { program } = require("commander");

// Define CLI program
program
  .version("1.0.0")
  .description("Bulk rename files in directory")
  .requiredOption("-d, --dir <directory>", "Input directory containing files")
  .option("-r, --replace [strings...]", "Search and replace text in filenames")
  .parse(process.argv);

// Parse command line arguments
const {
  dir: dir,
  replace: [search, replace],
} = program.opts();

console.log(search, replace);

// Check if input exists
if (!fs.existsSync(dir)) {
  console.error("Input directory does not exist");
  process.exit(1);
}

// Rename File
function renameFile(filePath, search, replace) {
  const directory = path.dirname(filePath); // extracts directory portion of file path, excluding filename itself
  const pFile = path.parse(filePath); //parse file path
  const fileName = pFile.name;
  const fileExt = pFile.ext;

  const newFileName = fileName.replace(search, replace); // looks for substring "search" and replaces it with "replace"
  const newFilePath = path.join(directory, newFileName + fileExt); // create new file path for newly named file

  try {
    fs.renameSync(filePath, newFilePath); // renames file using old file path and new file path
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

renameFiles(dir, search, replace);
