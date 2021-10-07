const { connectToDatabase } = require('../../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getLeaves(req, res);
        }
        case 'POST': {
            addLeave(req, res);
        }
    }
}


async function addLeave(req, res) {
    //res.status(200).json({ name: 'John Doe' })
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the leave
        await db.collection('leaves').insertOne(JSON.parse(req.body));

        //
        // return a message
        return res.json({
            message: 'Leave added successfully',
            success: true
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function getLeaves(req, res) {
    try {
        let { db } = await connectToDatabase();
        let leaves = await db
            .collection('leaves')
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(leaves)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }

        
}