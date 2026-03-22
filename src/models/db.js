const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data.json');

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ articles: [], nextId: 1 }, null, 2));
}

const lire = () => {
  const contenu = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(contenu);
};

const sauvegarder = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = { lire, sauvegarder };