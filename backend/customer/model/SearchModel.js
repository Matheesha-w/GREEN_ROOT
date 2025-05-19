const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema(
  {
    search_name:{
        type: String,
        default: ""
    }
    ,createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Search = mongoose.model("SearchSchema", SearchSchema);

module.exports = Search;
