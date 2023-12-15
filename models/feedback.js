// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const FeedbackSchema = new Schema({
//   comment: { type: String, required: true },
//   admin: { type: Schema.Types.ObjectId, ref: "Admin" },
// });

// const Feedback = mongoose.model("FeedBack", FeedbackSchema);

// module.exports = Feedback;

// import sequelize from "../database-connection.js";
// import { DataTypes } from "sequelize";
// import Admin from "../models/admin.js"; 

// const Feedback = sequelize.define("Feedback", {
//     comment: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });


// Feedback.belongsTo(Admin); 
// Admin.hasMany(Feedback); 

// export default Feedback;
