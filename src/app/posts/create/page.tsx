"use client";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/posts", { title, content });
    router.push("/");
  };
  return (
    <Container sx={{ marginTop: "50px", marginBottom: "60px" }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item md={6}>
          <Box
            component="form"
            sx={{
              border: "1px solid black",
              minHeight: "100px",
              marginTop: "0px",
              padding: "15px",
              borderRadius: "8px",
            }}
            onSubmit={handleSubmit}
          >
            <h1 style={{ textAlign: "center" }}>Add Posts!</h1>
            <Box sx={{ marginBottom: "5px" }}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
              >
             
              </TextField>
            </Box>
            <Box sx={{ marginBottom: "5px" }}>
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ marginBottom: 2 }}
              >
               
              </TextField>
            </Box>
            <Button type="submit" variant="contained">
              Create Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>

    // <div className='flex slex-col items-center py-20'>
    //     <h1 className='text-bold'>Create New Posts</h1>
    //     <form onSubmit={handleSubmit} className='flex flex-col space-y-4 border p-6'>
    //         <input type="text"
    //         placeholder='Title'
    //         value={title}
    //         className='p-2 border border-slate-500'
    //         onChange={(e)=> setTitle(e.target.value)} />
    //         <textarea placeholder='Content'
    //         value={content}
    //         className='border border-slate-500 p-2'
    //         onChange={(e)=> setContent(e.target.value)}/>
    //         <Button type='submit' variant='contained'>Create Post</Button>
    //     </form>
    // </div>
  );
};

export default Create;
