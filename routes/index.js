const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const adminController = require('../controllers/adminController');

// Página inicial e busca
router.get('/', homeController.home);

// Página individual
router.get('/:slug', homeController.viewPost);

// Admin login
router.get('/admin/login', adminController.showLogin);
router.post('/admin/login', adminController.login);

// Cadastrar notícia
router.post('/admin/cadastro', adminController.createPost);

// Deletar notícia
router.get('/admin/deletar/:id', adminController.deletePost);

module.exports = router;