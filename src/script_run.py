import os
import sys

# home_dir = os.system('cd ~/.')
variable_name = sys.argv[1]
lowercase_variable_name = variable_name.lower()
capital_variable_name = lowercase_variable_name.capitalize()


# Create model file
if not os.path.exists("models"):
    os.makedirs("models")
with open("models/" + lowercase_variable_name + ".model.js", "w") as f:
    f.write(
        f"""
const mongoose = require('mongoose');
    const {{ toJSON, paginate }} = require('./plugins');
    const AutoIncrement = require('mongoose-sequence')(mongoose);
    const {lowercase_variable_name}Schema = mongoose.Schema(
    {{}},
    {{
        timestamps: true,
    }}
    );
    {lowercase_variable_name}Schema.plugin(toJSON);
    {lowercase_variable_name}Schema.plugin(paginate);
    {lowercase_variable_name}Schema.plugin(AutoIncrement, {{id: '{lowercase_variable_name}_id'}});
    const {capital_variable_name} = mongoose.model('{capital_variable_name}', {lowercase_variable_name}Schema);
    module.exports = {capital_variable_name};
"""
    )

# Create Service File
if not os.path.exists("services"):
    os.makedirs("services")
with open("services/" + lowercase_variable_name + ".service.js", "w") as f:
    f.write(
        f"""
const httpStatus = require('http-status');
const {{ {capital_variable_name} }} = require('../models');
const ApiError = require('../utils/ApiError');


const create{capital_variable_name} = async ({lowercase_variable_name}Body) => {{
  return {capital_variable_name}.create({lowercase_variable_name}Body);
}};

const query{capital_variable_name}s = async (filter, options) => {{
  const {lowercase_variable_name}s = await {capital_variable_name}.paginate(filter, options);
  return {lowercase_variable_name}s;
}};

const get{capital_variable_name}ById = async (id) => {{
  return {capital_variable_name}.findById(id);
}};


const update{capital_variable_name}ById = async ({lowercase_variable_name}Id, updateBody) => {{
  const {lowercase_variable_name} = await get{capital_variable_name}ById({lowercase_variable_name}Id);
  if (!{lowercase_variable_name}) {{
    throw new ApiError(httpStatus.NOT_FOUND, '{capital_variable_name} not found');
  }}
  Object.assign({lowercase_variable_name}, updateBody);
  await {lowercase_variable_name}.save();
  return {lowercase_variable_name};
}};

const delete{capital_variable_name}ById = async ({lowercase_variable_name}Id) => {{
  const {lowercase_variable_name} = await get{capital_variable_name}ById({lowercase_variable_name}Id);
  if (!{lowercase_variable_name}) {{
    throw new ApiError(httpStatus.NOT_FOUND, '{capital_variable_name} not found');
  }}
  await {lowercase_variable_name}.remove();
  return {lowercase_variable_name};
}};

module.exports = {{
  create{capital_variable_name},
  query{capital_variable_name}s,
  get{capital_variable_name}ById,
  update{capital_variable_name}ById,
  delete{capital_variable_name}ById,
}};
"""
    )


# Create Controller File
if not os.path.exists("controllers"):
    os.makedirs("controllers")
with open("controllers/" + lowercase_variable_name + ".controller.js", "w") as f:
    f.write(
        f"""
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {{ {lowercase_variable_name}Service }} = require('../services');

const create{capital_variable_name} = catchAsync(async (req, res) => {{
  const {lowercase_variable_name} = await {lowercase_variable_name}Service.create{capital_variable_name}(req.body);
  res.status(httpStatus.CREATED).send({lowercase_variable_name});
}});

const get{capital_variable_name}s = catchAsync(async (req, res) => {{
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await {lowercase_variable_name}Service.query{capital_variable_name}s(filter, options);
  res.send(result);
}});

const get{capital_variable_name} = catchAsync(async (req, res) => {{
  const {lowercase_variable_name} = await {lowercase_variable_name}Service.get{capital_variable_name}ById(req.params.{lowercase_variable_name}Id);
  if (!{lowercase_variable_name}) {{
    throw new ApiError(httpStatus.NOT_FOUND, '{capital_variable_name} not found');
  }}
  res.send({lowercase_variable_name});
}});

const update{capital_variable_name} = catchAsync(async (req, res) => {{
  const {lowercase_variable_name} = await {lowercase_variable_name}Service.update{capital_variable_name}ById(req.params.{lowercase_variable_name}Id, req.body);
  res.send({lowercase_variable_name});
}});

const delete{capital_variable_name} = catchAsync(async (req, res) => {{
  await {lowercase_variable_name}Service.delete{capital_variable_name}ById(req.params.{lowercase_variable_name}Id);
  res.status(httpStatus.NO_CONTENT).send();
}});

module.exports = {{
  create{capital_variable_name},
  get{capital_variable_name}s,
  get{capital_variable_name},
  update{capital_variable_name},
  delete{capital_variable_name},
}};
"""
    )


# Create Validation File
if not os.path.exists("validations"):
    os.makedirs("validations")
with open("validations/" + lowercase_variable_name + ".validation.js", "w") as f:
    f.write(
        f"""
const Joi = require('joi');


const create{capital_variable_name} = {{
  body: Joi.object().keys({{
    
  }}),
}};

const get{capital_variable_name}s = {{
  query: Joi.object().keys({{
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }}),
}};

const get{capital_variable_name} = {{
  params: 
}};

const update{capital_variable_name} = {{
  params: ,
  body: Joi.object()
    .keys({{
     
    }})
    .min(1),
}};

const delete{capital_variable_name} = {{
  params: 
}};

module.exports = {{
  create{capital_variable_name},
  get{capital_variable_name}s,
  get{capital_variable_name},
  update{capital_variable_name},
  delete{capital_variable_name},
}};
"""
    )

# Create routes file
if not os.path.exists("routes"):
    os.makedirs("routes")
with open("routes/v1/" + lowercase_variable_name + ".routes.js", "w") as f:
    f.write(
        f"""
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {lowercase_variable_name}Validation = require('../../validations/{lowercase_variable_name}.validation');
const {lowercase_variable_name}Controller = require('../../controllers/{lowercase_variable_name}.controller');

const router = express.Router();

router
  .route('/')
  .post( validate({lowercase_variable_name}Validation.create{capital_variable_name}), {lowercase_variable_name}Controller.create{capital_variable_name})
  .get( validate({lowercase_variable_name}Validation.get{capital_variable_name}s), {lowercase_variable_name}Controller.get{capital_variable_name}s);

router
  .route('/:{lowercase_variable_name}Id')
  .get( validate({lowercase_variable_name}Validation.get{capital_variable_name}), {lowercase_variable_name}Controller.get{capital_variable_name})
  .patch(validate({lowercase_variable_name}Validation.update{capital_variable_name}), {lowercase_variable_name}Controller.update{capital_variable_name})
  .delete( validate({lowercase_variable_name}Validation.delete{capital_variable_name}), {lowercase_variable_name}Controller.delete{capital_variable_name});

module.exports = router;
"""
    )
