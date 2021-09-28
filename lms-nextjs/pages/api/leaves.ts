const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

    // switch the methods
    switch (req.method) {
        case 'GET': {
            getLeaves(req, res);
        }
        case 'POST': {
            addLeave(req, res);
        }
    }
}


async function addLeave(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the leave
        await db.collection('leaves').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Leave added successfully',
            success: true,
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
        await db.collection('posts')
            .find({})
            .sort({ published: -1 })
            .toArray();

        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true
        });
    } catch (error) {

    }
}