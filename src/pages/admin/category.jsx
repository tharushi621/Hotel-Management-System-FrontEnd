import { useState, useEffect } from "react"

export default function AdminCategory(){

const [categories,setCategories]=useState([])
const [categoriesIsLoaded,setCategoriesIsLoaded]=useState(false)

useEffect(()=>{
  axios.get(import.meta.env.VITE_BACKEND_URL+"/api/category").then((res)=>{
    console.log(res)
  })
},[])


    return(
        <div className="w-full">
            Category
        </div>
    )
}