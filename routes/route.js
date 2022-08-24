
const Joi = require('joi');
const { getAllCompanies, createCompany, updateCompany, deleteCompany } = require('../controllers/companyController');

const routes = [
    {
        method: 'GET',
        path: '/company',
        handler: getAllCompanies,
        options: {
            description: 'Get Company List',
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/company/create',
        handler: createCompany,
        options: {
            description: 'Get Company List',
            tags: ['api'],
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
        method: 'PUT',
        path: '/company/update/{id}',
        handler: updateCompany,
        options: {
            description: 'Get Company List',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    name: Joi.string(),
                    type: Joi.string(),
                    city: Joi.string(),
                    headquarter: Joi.string(),
                }),
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
            description: 'Get Company List',
            tags: ['api'],
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