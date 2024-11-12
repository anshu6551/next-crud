"use client"
import { Box, Button, Card, CardContent, Container } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Posts(){
    const [posts, setPosts]= useState([])

    const fetchProducts = async()=>{
        const response = await axios.get('http://localhost:5000/posts')
        setPosts(response.data)
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const handleDelete = async (id) =>{
        await axios.delete(`http://localhost:5000/posts/${id}`)
        const filterData = posts.filter(post => post.id !== id)
        setPosts(filterData)
    }

    return(
        <div className="px-48 py-20">
           <Box sx={{display:"flex", justifyContent:"space-evenly"}}>
                <h1 className="text-3xl font-bold">Posts!</h1>
                
                <Link href="/posts/create" ><Button sx={{backgroundColor: "green", marginTop:"20px"}} variant="contained">Create New Post</Button></Link>
                </Box>
                <Container>
            <Card  sx={{display:"flex", justifyContent:"space-between"}}>
                <CardContent >
                {/* <Box> */}
            <table className="table table-bordered table-striped">
           
                <thead>
               
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
              
                <tbody>
                    {   posts?.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td> 
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>
                              <Link href={`/posts/${post.id}`}> <Button variant="contained" >Read</Button></Link> 
                              </td>
                              <td>
                              <Link href={`/posts/${post.id}?mode=edit`}> <Button variant="contained" sx={{backgroundColor:"green"}}>Edit</Button></Link> </td>
                               <td> <Button onClick={() => handleDelete(post.id)} variant="contained" sx={{backgroundColor:"red"}}>Delete</Button>
                            </td>
                        </tr>
                        

                    )) }
                </tbody>
            </table>
            {/* </Box> */}
            </CardContent>
            </Card>
            </Container>
        </div>
    )
}