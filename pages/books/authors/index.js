import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useTheme } from "@/context/theme";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

function Index() {
  const router=useRouter();
    const {session}=useUser();
    if(!session){
      router.push("/login")
    }
  const {theme,toggleTheme}=useTheme();
  const { data, error } = useSWR("/api/authors", fetcher);
  console.log(data);
  
  const dataToSend=data?.data.map((val)=>{
    return{
      link:`/books/authors/${val._id}`,
      title:val.name
    }
  })
  
  if (error) return <div className={`text-red-500 text-center ${theme === 'light' ? 'bg-blue-200' : 'bg-black'}`}>Failed to load data.</div>;
  if (!data) return <div className={`text-gray-500 text-center ${theme === 'light' ? 'bg-blue-200' : 'bg-black'}`}>Loading...</div>;

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === 'light' ? 'bg-blue-200' : ''}`}>
      <h1 className={`text-3xl md:text-7xl font-bold text-center ${theme === 'light' ? 'text-blue-900' : 'text-white'}`}>
        List of Authors
      </h1>
      <HoverEffect theme={theme} items={dataToSend} />
    </div>
  );
}

export default Index;
