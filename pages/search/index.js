import { useEffect, useState } from "react";
import useSWR from "swr";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SearchPage = () => {
  const router=useRouter();
  const {session}=useUser();
  if(!session){
    router.push("/login");
  }
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchUrl, setSearchUrl] = useState(null);
  const { data } = useSWR(searchUrl?searchUrl:null, fetcher);
  const { theme } = useTheme();

  useEffect(() => {

    const getHistory=async()=>{
      const token=Cookies.get('token');
    try{
      const response=await axios.get("http://localhost:3000/api/user/history",{headers:{
        Authorization:`Bearer ${token}`
    }});
      if(response.data.user){
        setSearchHistory(response.data.user);
      }
    }
    catch(error){
      console.log("ERROR ",error); 
    }
  }
  getHistory();
    // const storedHistory =
    //   JSON.parse(localStorage.getItem("searchHistory")) || [];
    // setSearchHistory(storedHistory);
  }, []);

  const handleSearch = async(event) => {
    event.preventDefault();
    const token=Cookies.get('token');
    console.log(token);
    console.log(query);
    
    try{
      const response=await axios.post("http://localhost:3000/api/user/history",{query:query},{headers:{
        Authorization:`Bearer ${token}`
    }});
      if(response.data.user){
        console.log(response.data);
        
        setSearchHistory(response.data.user);
        setSearchUrl("/api/books");
      }
    }
    catch(error){
      console.log("ERROR ",error); 
    }

    // if (query) {
    //   const updatedHistory = [
    //     query,
    //     ...searchHistory.filter((item) => item !== query),
    //   ];
    //   setSearchHistory(updatedHistory);
    //   localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    //   setSearchUrl("/api/books");
    // }
  };
  console.log("HERE",data);
  
  const filteredResults = data?data.data.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const deleteSearch = async(item, index) => {
    const token=Cookies.get('token');
    console.log(token);
    
    try{
      const response=await axios.delete("http://localhost:3000/api/user/history",{data:{query:item},headers:{
        Authorization:`Bearer ${token}`
    }});
      if(response.data.user){
        console.log(response.data.user);
        
        setSearchHistory(response.data.user);
      }
    }
    catch(error){
      console.log("ERROR ",error); 
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center py-10 ${
        theme === "light" ? "bg-blue-200" : ""
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-4 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Search
      </h1>
      <form
        onSubmit={handleSearch}
        className="mb-4 flex flex-col items-center w-full max-w-md"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={`border p-2 rounded-lg w-full ${
            theme === "light"
              ? "text-black border-gray-300"
              : "text-white border-gray-600 bg-gray-800"
          }`}
        />
        <button
          type="submit"
          className={`ml-2 mt-2 p-2 rounded-lg ${
            theme === "light"
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Search
        </button>
      </form>

      <h2
        className={`text-xl font-semibold mt-6 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Recent Searches
      </h2>
      <ul className="mt-4">
        {searchHistory.length > 0 ? (
          searchHistory.map((item, index) => (
            <li
              key={index}
              className={`p-2 border-b ${
                theme === "light" ? "border-gray-300" : "border-gray-600"
              }`}
            >
              {item.history}
              <button
                onClick={() => {
                  deleteSearch(item, index);
                }}
                className={`relative ml-2 p-2 rounded-lg ${
                  theme === "light"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <li
            className={`p-2 ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            No recent searches
          </li>
        )}
      </ul>

      <h2
        className={`text-xl font-semibold mt-6 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Search Results:
      </h2>
      <div>
        {filteredResults.map((item) => {
          return (
            <CardContainer key={item.id} className="inter-var mr-4">
              <CardBody
                className={`relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border
                ${
                  theme === "light" ? "bg-blue-900" : "bg-gray-50 dark:bg-black"
                } 
                dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1]`}
              >
                <CardItem
                  translateZ="50"
                  className={`text-xl font-bold ${
                    theme === "light" ? "text-neutral-600" : "text-white"
                  }`}
                >
                  {item.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className={`text-neutral-500 text-sm max-w-sm mt-2 ${
                    theme === "light"
                      ? "dark:text-neutral-800"
                      : "dark:text-neutral-300"
                  }`}
                >
                  {item.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={item.imagePath}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-4">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className={`px-4 py-2 rounded-xl ${
                      theme === "light"
                        ? "bg-black text-white"
                        : "bg-blue-500 text-white"
                    } text-xs font-bold`}
                  >
                    <Link href={`/books/${item._id}`}>More Details</Link>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
