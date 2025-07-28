const Project = require('../models/project.model');
const validate = require('../utils/validate');
const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  client: Joi.string().required(),
});

exports.createProject = async (req, res, next) => {
  try {
    await validate(projectSchema, req.body);
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    await validate(projectSchema, req.body);
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProjectsByClient = async (req, res, next) => {
  try {
    const projects = await Project.find({ client: req.params.clientId });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};
