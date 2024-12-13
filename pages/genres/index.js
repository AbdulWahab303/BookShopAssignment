import axios from 'axios';
import Link from 'next/link';
import { useTheme } from "@/context/theme";
import { useRouter } from 'next/router';
import { useUser } from '@/context/user';

function Genres(props) {
  const router=useRouter();
    const {session}=useUser();
    if(!session){
      router.push("/login");
    }
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-10 px-4 ${
      theme === 'light' ? 'bg-blue-200' : ''
    }`}>
      <h1 className={`text-3xl md:text-7xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} text-center`}>
        List of Available Genres
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-10">
        {props.data.map((val, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg border-l-4 border-gray-500 hover:border-gray-600 transform hover:scale-105 transition-transform duration-200 ${
              theme === 'light' ? 'bg-white' : 'bg-gray-800'
            }`}
          >
            <h2 className={`text-2xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              {val.name}
            </h2>
            <p className={`text-gray-600 ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
              Dive into the world of {val.name}. Explore popular titles and timeless classics.
            </p>
            <Link href={`/genres/${val._id}`}>
              <button className={`absolute bottom-2 right-3 py-1 px-5 rounded-lg font-medium transition-colors duration-200 shadow-md ${
                theme === 'light' ? 'bg-black text-white hover:bg-gray-200 hover:text-black' : 'bg-white text-black hover:bg-gray-800 hover:text-white'
              }`}>
                Explore
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;

export async function getStaticProps() {
  let allGenre=[];
  try {
      const response=await axios.get("http://localhost:3000/api/genres");
      if(response.data){
        
        allGenre=response.data.data;
        console.log(allGenre);
        
      }
  } catch (error) {
    console.error("Error in sending API ",error);
  }
  return {
    props: {
      data: allGenre,
    },
  };
}
