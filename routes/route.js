
const Joi = require('joi');
const { getAllCompanies, createCompany, updateCompany, deleteCompany } = require('../controllers/companyController');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getAllCompanies
    },
    {
        method: 'POST',
        path: '/company/create',
        handler: createCompany,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    type: Joi.string().required(),
                    city: Joi.string().required(),
                    headquarter: Joi.string().required(),
                }),
                failAction: (request, h, error) => {
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'PATCH',
        path: '/company/update/{id}',
        handler: updateCompany,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                failAction: (request, h, error) => {
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/company/delete/{id}',
        handler: deleteCompany,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                failAction: (request, h, error) => {
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
                }
            }
        }

    }
];

module.exports = routes;