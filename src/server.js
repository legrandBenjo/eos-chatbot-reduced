const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // cette ligne permet d'activer le middleware cors

const searchDirectory = (directoryPath, fileName) => {
  const results = [];

  const searchRecursive = (currentPath) => {
    const files = fs.readdirSync(currentPath);
  
    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);
  
      if (stats.isDirectory()) {
        searchRecursive(filePath);
      } else if (stats.isFile() && file.toLowerCase().includes(fileName.toLowerCase())) {
        results.push(filePath);
      }
    });
  };
  

  searchRecursive(directoryPath);

  return results;
};


app.get('/search', (req, res) => {
  const directoryPath = 'G:/your_directory_path'; // Remplace ici par le chemin principal qui contient tes 1000 sous-dossiers
  const fileName = req.query.fileName;
  const searchResults = searchDirectory(directoryPath, fileName).filter(result =>
    result.toLowerCase().includes(fileName)
  );
  res.json(searchResults);
  console.log(searchResults);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
