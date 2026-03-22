const { lire, sauvegarder } = require('../models/db');

const creerArticle = (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;

  if (!titre || !contenu || !auteur) {
    return res.status(400).json({
      erreur: "Les champs titre, contenu et auteur sont obligatoires."
    });
  }

  const db = lire();
  const nouvelArticle = {
    id: db.nextId,
    titre,
    contenu,
    auteur,
    date: date || new Date().toISOString().split('T')[0],
    categorie: categorie || '',
    tags: Array.isArray(tags) ? tags : (tags ? [tags] : [])
  };

  db.articles.push(nouvelArticle);
  db.nextId += 1;
  sauvegarder(db);

  res.status(201).json({
    message: "Article créé avec succès !",
    id: nouvelArticle.id
  });
};

const lireTousLesArticles = (req, res) => {
  const { categorie, auteur, date } = req.query;
  const db = lire();

  let articles = db.articles;

  if (categorie) articles = articles.filter(a => a.categorie === categorie);
  if (auteur)    articles = articles.filter(a => a.auteur === auteur);
  if (date)      articles = articles.filter(a => a.date === date);

  res.status(200).json({ articles });
};

const lireArticleParId = (req, res) => {
  const id = parseInt(req.params.id);
  const db = lire();
  const article = db.articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ erreur: `Article avec l'ID ${id} introuvable.` });
  }

  res.status(200).json(article);
};

const modifierArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const db = lire();
  const index = db.articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: `Article avec l'ID ${id} introuvable.` });
  }

  const { titre, contenu, categorie, tags } = req.body;
  const article = db.articles[index];

  db.articles[index] = {
    ...article,
    titre:     titre     || article.titre,
    contenu:   contenu   || article.contenu,
    categorie: categorie !== undefined ? categorie : article.categorie,
    tags:      tags !== undefined
                 ? (Array.isArray(tags) ? tags : [tags])
                 : article.tags
  };

  sauvegarder(db);
  res.status(200).json({ message: "Article modifié avec succès !" });
};

const supprimerArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const db = lire();
  const index = db.articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: `Article avec l'ID ${id} introuvable.` });
  }

  db.articles.splice(index, 1);
  sauvegarder(db);
  res.status(200).json({ message: `Article ${id} supprimé avec succès.` });
};

const rechercherArticles = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ erreur: "Le paramètre 'query' est obligatoire." });
  }

  const db = lire();
  const texte = query.toLowerCase();

  const articles = db.articles.filter(a =>
    a.titre.toLowerCase().includes(texte) ||
    a.contenu.toLowerCase().includes(texte)
  );

  res.status(200).json({ articles });
};

module.exports = {
  creerArticle,
  lireTousLesArticles,
  lireArticleParId,
  modifierArticle,
  supprimerArticle,
  rechercherArticles
};