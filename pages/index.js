import Background from "@/components/Background";
import path from 'path'
import fs from 'fs/promises';
import { MovingCards } from "@/components/MovingCards";


export default function Home(props){
  return(
    <>
    <Background/>
    <MovingCards
     data={props.data.map((val)=>({
      quote:val.description,
      name:val.title,
      title:val.price,
    }))}/>
    </>
  )
}



export async function getStaticProps(){
  const p=path.join(process.cwd(),"data","data.json");
  const datajson=await fs.readFile(p);
  const data=JSON.parse(datajson);
  const featuredBooks=data.books.filter((val)=>val.isFeatured);
  return{
    props:{
      data:featuredBooks
    },
  }
}