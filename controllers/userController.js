const User = require('../module/User');


exports.getUser =async (req,res)=>{
    try {
        
        const findLinst=await User.find({});
        res.status(200).send(findLinst);

    } catch (error) {
        res.status(500).send(error);
    }
}

exports.addUser = async (req, res) => {
    try {
        const findUser = await User.findOne({ name: req.body.name });
        if (!findUser) {
            const addData = {
                name: req.body.name,
                count: 1
            };
    
            const newUser = new User(addData);
            await newUser.save();
            res.json({status:200, message:'New user added successfully'});
        } else {
            res.json({status:409,message:'User already added'});
        }
        
    } catch (error) {
        res.json({status:500,message:'Internal Server Error'});
    }
};

exports.updateUser = async (req, res) => {
    try {

         // Check if another user with the same name exists, excluding the current user ID
         const sameName = await User.findOne({ name: req.body.name, _id: { $ne: req.body.id } });
         if (sameName) {
            return res.json({ status: 409, message: 'Same Name User already exists' });
        }

        // Find the user by ID
        const findUser = await User.findById(req.body.id);
        
        if (findUser) {
            // If the user is found, update the user data
            findUser.name = req.body.name; // Update the name
            findUser.count += 1; // Increment the count

            // Save the updated user data
            await findUser.save();
            
            return res.json({status:200,message:'User data updated successfully'});
        } else {
            // If the user is not found, send a response indicating that the user was not found
            return res.json({status:404 ,message:'User not found'});
        }
    } catch (error) {
        // Handle errors
        console.error('Error updating user:', error.message);
        return res.json({status:500 ,message:'Internal Server Error'});
    }
};

exports.deleteUser =async (req,res)=>{
    try {
        // Find the user by ID and delete
        await User.findByIdAndDelete(req.body.Id);
        
        res.status(200).send({message:'User Deleted Successfully'});
    } catch (error) {
        // Handle errors
        console.error('Error deleting user:', error.message);
        res.status(500).send({message:'Internal Server Error'});
    }
}


exports.getTotalCount = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: "$count" }
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).send({totalCount: result[0].totalCount});
        } else {
            res.status(200).send({ totalCount: 0 });
        }
    } catch (error) {
        console.error('Error calculating total count:', error.message);
        res.status(500).send({message:'Internal Server Error'});
    }
};