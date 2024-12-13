import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { useTheme } from "@/context/theme";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@/context/user";

function books(props) {
  const { theme, toggleTheme } = useTheme();
  const router=useRouter();
  const {session}=useUser();
  if(!session){
    router.push("/login")
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-blue-200" : "bg-black"
      } py-12 pt-36`}
    >
      <h1
        className={`text-lg md:text-7xl text-center font-sans font-bold mb-8 ${
          theme === "light" ? "text-blue-900" : "text-white"
        }`}
      >
        Available Books ({props.data.length})
      </h1>
      <div className="flex flex-wrap justify-center">
        {props.data.map((item) => {
          return (
            <CardContainer className="inter-var mr-4">
              <CardBody
                className={`relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border
      ${theme === "light" ? "bg-blue-900" : "bg-gray-50 dark:bg-black"} 
      dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1]`}
              >
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {item.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
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
                <div className="flex justify-between items-center mt-20">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
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
}

export default books;

export async function getStaticProps() {
  console.log("working123");
  
  let allBooks=[];
  try {
      const response=await axios.get("http://localhost:3000/api/books");
      if(response.data){
        
        allBooks=response.data.data;
      }
  } catch (error) {
    console.error("Error in sending API ",error);
  }
  return {
    props: {
      data: allBooks,
    },
    revalidate: 60,
  };
}
