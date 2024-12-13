import dbConnect from "./dbConnect.js";
import Genre from "../models/genres.js";
import Author from "../models/authors.js";
import mongoose from "mongoose";
import Books from "../models/books.js";
import bcrypt from 'bcryptjs';
import User from "../models/user.js";

// const data1=[
//       { "name": "Fiction" },
//       { "name": "Dystopian" },
//       { "name": "Romance" },
//       { "name": "Adventure" }
//     ];


// const data2=[
//     {
      
//       "name": "F. Scott Fitzgerald",
//       "biography": "An American novelist and short story writer."
//     },
//     {
      
//       "name": "Harper Lee",
//       "biography": "An American novelist known for 'To Kill a Mockingbird'."
//     },
//     {
      
//       "name": "George Orwell",
//       "biography": "An English novelist and essayist."
//     },
//     {
      
//       "name": "Jane Austen",
//       "biography": "An English novelist known for her social commentary."
//     },
//     {
      
//       "name": "J.D. Salinger",
//       "biography": "An American writer known for 'The Catcher in the Rye'."
//     },
//     {
      
//       "name": "Paulo Coelho",
//       "biography": "A Brazilian lyricist and novelist."
//     }
//   ]



// const data3=[
//     {
      
//       "title": "The Great Gatsby",
//       "authorId": "1",
//       "description": "A novel about the American dream and the disillusionment that comes with it.",
//       "price": "10.99",
//       "genreId": "1",
//       "rating": "4.4",
//       "isFeatured":true,
//       "imagePath":"/images/greatGatsby.jpg"
//     },
//     {
      
//       "title": "To Kill a Mockingbird",
//       "authorId": "2",
//       "description": "A novel set in the Deep South and focused on themes of racial injustice and moral growth.",
//       "price": "12.99",
//       "genreId": "1",
//       "rating": "4.8",
//       "isFeatured":true,
//       "imagePath":"/images/mocking.jpg"
//     },
//     {
      
//       "title": "1984",
//       "authorId": "3",
//       "description": "A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.",
//       "price": "14.99",
//       "genreId": "2",
//       "rating": "4.7",
//       "isFeatured":true,
//       "imagePath":"/images/1984.jpg"
//     },
//     {
      
//       "title": "Pride and Prejudice",
//       "authorId": "4",
//       "description": "A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet.",
//       "price": "9.99",
//       "genreId": "3",
//       "rating": "4.6",
//       "isFeatured":true,
//       "imagePath":"/images/pride.jpg"
//     },
//     {
      
//       "title": "The Catcher in the Rye",
//       "authorId": "5",
//       "description": "A story about teenage rebellion and alienation narrated by the protagonist Holden Caulfield.",
//       "price": "11.99",
//       "genreId": "1",
//       "rating": "4.0",
//       "isFeatured":true,
//       "imagePath":"/images/rye.jpg"
//     },
//     {
      
//       "title": "The Alchemist",
//       "authorId": "6",
//       "description": "A philosophical book that tells the story of Santiago, a shepherd boy on a journey to discover his personal legend.",
//       "price": "13.99",
//       "genreId": "4",
//       "rating": "4.5",
//       "isFeatured":false,
//       "imagePath":"/images/alchemist.jpg"
//     }
//   ]


const data4=[
    {
        "username":"abw123",
        "email":"under2cold@gmail.com",
        "password":"123"
    },
    {
        "username":"asmar123",
        "email":"asmar@gmail.com",
        "password":"123"
    },
    {
        "username":"saad123",
        "email":"saad@gmail.com",
        "password":"123"
    },
    {
        "username":"me123",
        "email":"me@gmail.com",
        "password":"123"
    },

]



const init=async()=>{
    try{
        await dbConnect();
        console.log("Connected to the database.");

        // await Genre.insertMany(data1);
        // await Author.insertMany(data2);
        // const GenreData=await Genre.find({},{name:0});
        // const GenreID=GenreData.map((val,index)=>{
        //     return {id:index,actualId:val._id}
        // });
        // const AuthorData=await Author.find({},{name:0,biography:0});
        // const AuthorId=AuthorData.map((val,index)=>{
        //     return {id:index,actualId:val._id}
        // });
        // const BookData=data3.map((val)=>{
        //     const aid=AuthorId.find((a)=>parseInt(a.id)+1===parseInt(val.authorId));
        //     const gid=GenreID.find((g)=>parseInt(g.id)+1===parseInt(val.genreId));

        //     return{
        //         ...val,
        //         authorId:aid.actualId,
        //         genreId:gid.actualId
        //     }
        // })
        
        // await Books.insertMany(BookData);


        const userData=await Promise.all(
        data4.map(async(val)=>{
            return{
                ...val,
                password:await bcrypt.hash(val.password,10)
            }
        }
    )
)       
        await User.deleteMany({});
        await User.insertMany(userData);
        console.log("Data saved successfully.");


        mongoose.connection.close();

    }
    catch(error){
        console.error("Error inserting Data",error);
    }
};


init();



