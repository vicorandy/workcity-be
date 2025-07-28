const Client = require('../models/client.model');
const validate = require('../utils/validate');
const Joi = require('joi');

const clientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

exports.createClient = async (req, res, next) => {
  try {
    await validate(clientSchema, req.body);
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    next(err);
  }
};
