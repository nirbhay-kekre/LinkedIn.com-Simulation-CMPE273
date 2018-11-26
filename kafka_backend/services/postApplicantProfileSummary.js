var { Users } = require('../models/user');
const db = require('../config/mysql');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka post Applicant profile Summary backend");
    console.log("In handle request:" + JSON.stringify(msg));

    console.log(msg);
    let resp = {};
    
    try {
        let profile = await Users.findOneAndUpdate(
            { email: msg.email },
            {
                $set: {
                    firstName : msg.firstName,
                    lastName : msg.lastName,
                    state : msg.state,
                    zipcode : msg.zipcode,
                    address : msg.address,
                    profileSummary : msg.profileSummary,
                    phoneNumber : msg.phoneNumber,
                    resume : msg.resume,
                    profilePicture : msg.profilePicture,
                }
            },
            {new: true}
        );
        await db.updateQuery('UPDATE user_profile SET firstName = ?, lastName = ? where email = ?', [msg.firstName, msg.lastName, msg.email]);
        console.log(profile);
        resp = prepareSuccess({ "profile": profile });
    }
    catch (error) {
        console.log("Something went wrong while inserting profile! : ", error);
        //don't let time out occur, send internal server error
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}