"use client";

import  Link  from "next/link";
import { usePathname } from "next/navigation";

const Back = () => {

const Pathname =  usePathname();
const paths = Pathname.split("/").filter((p)=>p);


  return (
    <div className="flex bg-gray-900  h-10 mt-[20px] ">
     
        <ol className="flex text-white p-2 gap-2  iteam-center justify-center mx-auto">
          <li ><Link className="hover:underline hover:text-blue-600" href="/Home">Home</Link></li>
          {paths.map((path,index)=>{
            const href = "/" + paths.slice(0, index + 1).join("/");
          const label = path.charAt(0).toUpperCase() + path.slice(1);
          return(
            <li key={href}>
              <span className="p-1">/</span>
              <Link className="hover:underline hover:text-blue-600"href={href}>{label}</Link>
            </li>
          )
          })}
        </ol>
        
            
    </div>
            
  )
}

export default function App(){
    return(
        <Back />
    )
}
