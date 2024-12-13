import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/theme";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@/context/user";

function Index(props) {
  const { theme, toggleTheme } = useTheme();
  const router=useRouter();
    const {session}=useUser();
    if(!session){
      router.push("/login")
    }

  if (!props.bookData) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center h-screen px-6 ${
        theme === "light" ? "bg-blue-200" : ""
      }`}
    >
      <div
        className={`relative max-w-lg p-6 rounded-lg shadow-lg ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <Image
          src={props.bookData.imagePath}
          height="200"
          width="200"
          className="object-cover rounded-lg shadow-md"
          alt="Book thumbnail"
        />

        <h1
          className={`text-4xl mt-6 ${
            theme === "light"
              ? "text-blue-900 font-bold"
              : "text-white font-semibold"
          }`}
        >
          {props.bookData.title}
        </h1>

        <p
          className={`mt-4 text-lg ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          {props.bookData.description}
        </p>

        <div className="mt-6 space-y-2">
          <h2
            className={`text-2xl font-semibold ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            Price: ${props.bookData.price}
          </h2>
          <h2
            className={`text-2xl font-semibold ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            Rating: {props.bookData.rating}
          </h2>
          <h3
            className={`text-lg mt-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Author: {props.authorData.name}
          </h3>
        </div>

        <button
          className={`mt-6 inline-block px-4 py-2 rounded-full shadow-lg ${
            theme === "light"
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          <Link href={`/books/authors/${props.authorData._id}`}>
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Index;

export async function getStaticProps(context) {

  let allBooks=[];
  try {
      const response=await axios.get("http://localhost:3000/api/books");
      if(response.data){
        
        allBooks=response.data.data;
      }
  } catch (error) {
    console.error("Error in sending API ",error);
  }

  const book = allBooks.find((val) => val._id === context.params.bookId);
  let allAuthor=[];
  let author;
  try {
    const response=await axios.get("http://localhost:3000/api/authors");
    if(response.data){
      
      allAuthor=response.data.data;
    }
} catch (error) {
  console.error("Error in sending API ",error);
}
  if (book) {
    author = allAuthor.find((val) => val._id === book.authorId);
  }
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      bookData: book,
      authorData: author,
    },
  };
}

export async function getStaticPaths() {

  let allBooks=[];
  try {
      const response=await axios.get("http://localhost:3000/api/books");
      if(response.data){
        
        allBooks=response.data.data;
      }
  } catch (error) {
    console.error("Error in sending API ",error);
  }
  const ids = allBooks.map((val) => val._id);
  const paths = ids.map((val) => ({ params: { bookId: val } }));

  return {
    paths: paths,
    fallback: true,
  };
}
