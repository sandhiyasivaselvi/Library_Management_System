import mongoose, { Schema } from "mongoose";


  const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required : [true, "Book title is required"]
    },
    author:{
        type:String,
        required : [true, "Author name  is required"]
    },
    isbn:{
        type:String,
        required : [true, "Author name  is required"]
    },
    noc:{
        type:Number,
        required : [true, "Number of copies is required"]
    },
    category: {
        type: String,
        required: [true, "Category selection is required"],
        enum: {
        values: ['Fantasy & fairy Tales','Comics','Science'],
        message: '{VALUE} is not a valid category'
        }
    },        
    
    year: {
        type:Number,
        required : [true, "Year is required"]

    }

  })
  
  export default mongoose.model("Book", bookSchema);