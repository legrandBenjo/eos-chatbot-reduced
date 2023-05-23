const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jsonfile = require('jsonfile');

const app = express();
app.use(cors());

const INDEX_FILE_PATH = 'fileIndex.json'; // Chemin vers le fichier d'index
let fileIndex = {}; // Index des fichiers

// Chargement de l'index à partir du fichier s'il existe
if (fs.existsSync(INDEX_FILE_PATH)) {
  try {
    fileIndex = jsonfile.readFileSync(INDEX_FILE_PATH);
  } catch (error) {
    console.error('Error loading index file:', error);
  }
} else {
  // Si le fichier d'index n'existe pas, effectuer l'indexation initiale
  fileIndex = createFileIndex('/Users/mac/Documents');

  // Sauvegarder l'index dans le fichier
  try {
    jsonfile.writeFileSync(INDEX_FILE_PATH, fileIndex);
  } catch (error) {
    console.error('Error saving index file:', error);
  }
}

app.get('/search', (req, res) => {
  const searchTerm = req.query.fileName;
  const searchResults = performSearch(searchTerm, fileIndex);
  res.json(searchResults);
});

function createFileIndex(directory) {
  const fileIndex = {};

  function indexFiles(directory) {
    try {
      const files = fs.readdirSync(directory);

      for (const file of files) {
        const filePath = path.join(directory, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
          indexFiles(filePath);
        } else if (fileStat.isFile()) {
          const fileName = file.toLowerCase();
          if (!fileIndex[fileName]) {
            fileIndex[fileName] = [];
          }
          fileIndex[fileName].push(filePath);
        }
      }
    } catch (error) {
      console.error(`Error indexing directory: ${directory}`, error);
    }
  }

  indexFiles(directory);
  return fileIndex;
}

function performSearch(searchTerm, fileIndex) {
  const searchResults = [];
  const searchTermLowerCase = searchTerm.toLowerCase();

  for (const fileName in fileIndex) {
    if (fileName.startsWith(searchTermLowerCase)) {
      searchResults.push(...fileIndex[fileName]);
    }
  }

  return searchResults;
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});