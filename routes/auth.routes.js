const express = require('express');

function createAuthRoutes({ usersController }) {
  const router = express.Router();

  router.post('/register', (req, res) => usersController.register(req, res));
  router.post('/login', (req, res) => usersController.login(req, res));

  return router;
}

function createUserRoutes({ usersController }) {
  const router = express.Router();

  router.get('/profile/:userId', (req, res) => usersController.getProfile(req, res));

  return router;
}

module.exports = { createAuthRoutes, createUserRoutes };
