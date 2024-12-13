import { useTheme } from "@/context/theme";
import { useUser } from "@/context/user";
import axios from "axios";
import { useRouter } from "next/router";

export default function AuthorDetails(props) {
  const { theme } = useTheme();
  const router=useRouter();
    const {session}=useUser();
    if(!session){
      router.push("/login")
    }

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-8 ${
        theme === "light" ? "bg-blue-200" : ""
      }`}
    >
      <div
        className={`rounded-lg shadow-lg transition-transform transform hover:scale-105 p-6 max-w-md ${
          theme === "light"
            ? "bg-white border border-gray-300"
            : "bg-gray-800 border border-gray-700"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-4 text-center ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          {props.authorData.name}
        </h1>
        <p
          className={`text-lg text-center ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          {props.authorData.biography}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  let allAuthor=[];
  try {
    const response=await axios.get("http://localhost:3000/api/authors");
    if(response.data){
      
      allAuthor=response.data.data;
    }
} catch (error) {
  console.error("Error in sending API ",error);
}
  const author = allAuthor.find((val) => val._id === context.params.authorId);
  console.log(author);
  

  if (!author) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      authorData: author,
    },
  };
}

export async function getStaticPaths() {
  let allAuthor=[];
  
  try {
    const response=await axios.get("http://localhost:3000/api/authors");
    if(response.data){
      
      allAuthor=response.data.data;
    }
} catch (error) {
  console.error("Error in sending API ",error);
}
  const ids = allAuthor.map((val) => val._id);
  const paths = ids.map((val) => ({ params: { authorId: val } }));

  return {
    paths: paths,
    fallback: true,
  };
}
