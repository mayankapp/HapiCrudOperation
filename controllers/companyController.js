const db = require('../config/db');
const { ObjectId } = require('mongodb');

const getAllCompanies = async (req, h) => {
    try {
        const data = await db.get().collection('companies').find({}).toArray();
        return h.response(data);
    } catch (error) {
        console.log(error.message);
        return h.response({ error: error.message });
    }
}

const createCompany = async (req, h) => {
    try {
        const data = await db.get().collection('companies').insertOne(req.payload);
        return h.response({ success: true, data});
    } catch (error) {
        console.log(error.message);
        return h.response({ error: error.message });
    }
}

const updateCompany = async (req, h) => {
    try {
        const _id = new ObjectId(req.params.id);
        await db.get().collection('companies').updateOne({ _id }, { $set: req.payload }, { upsert: true });
        return h.response({ success: true, message: "Company data Updated Successfully!!"});
    } catch (error) {
        console.log(error.message);
        return h.response({ error: error.message });
    }
}

const deleteCompany = async (req, h) => {
    try {
        const _id = new ObjectId(req.params.id);
        await db.get().collection('companies').deleteOne({ _id });
        return h.response({ success: true, message: "Company Deleted Successfully!!" });
    } catch (error) {
        console.log(error.message);
        return h.response({ error: error.message });
    }
}

module.exports = {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany
};