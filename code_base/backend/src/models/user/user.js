const mongoose = require("mongoose");
const Address = require("src/models/user/address")
const SearchTag = require("../group/searchTag")

const UserSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      passwordHash: {
        type: String,
        required: true,
      },
      passwordSalt: {
        type: String,
        required: true,
      },
      UserInformation: {
        surname: String,
        firstname: String,
        birthDate: Date,

        billingAdresses: [
          Address
        ],
      },
      searchTags: [SearchTag]
    },
    {timestamps: true}
);

module.exports = mongoose.model("user", UserSchema);
