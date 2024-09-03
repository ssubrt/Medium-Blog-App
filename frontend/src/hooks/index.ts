import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";





export interface Blog{
    
        "content": string;
        "title": string;
        "id": string;
        "author": {
            "name": string
        }
    
}


export const useBlog = ({ id }:{id:string}) =>{

    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blog | null>(null)
    const [error, setError] = useState<string | null>(null)
  
    useEffect( ()=>{
      axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data.posts)
        setBlog(response.data.posts)
        setLoading(false)
       
      
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          setError('An error occurred while fetching the blog post. Please try again later.')
        } else {
          // Handle other error types here
        }
        setLoading(false)
      })
    },[id])
  
    return {
      loading,
      blog,
      error
    }


}





export const useBlogs = () =>{
  
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect( ()=>{
        axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.posts);
            setLoading(false);
        })

    },[])

    return {
        loading,
        blogs
    }


} 

