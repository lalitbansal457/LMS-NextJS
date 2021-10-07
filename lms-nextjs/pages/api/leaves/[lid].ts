const { connectToDatabase } = require('../../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default function handler(req, res) {
	
	const getLeave =  async(req, res) => {
		try {
			let {lid} = req.query;

		    let { db } = await connectToDatabase();
		    let leaves = await db
		        .collection('leaves')
		        .findOne({"_id": ObjectId(lid)})
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

	return getLeave(req, res);
}