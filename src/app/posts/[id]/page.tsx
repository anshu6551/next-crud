"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ({ params }) {
  const id = params.id;
  const searchQuery = useSearchParams();
  const mode = searchQuery.get("mode");

  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(mode === "edit");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    setEditing(mode === "edit");
  }, [mode]);

  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    setPost(response.data);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/posts/${id}`, { title, content });
    setEditing(false);
    fetchPost();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    router.push("/");
  };

  return (
    //     <Container sx={{ marginTop: "50px", marginBottom: "60px" }}>
    //     <Grid container sx={{ justifyContent: "center" }}>
    //       <Grid item md={6}>
    //       <Box  component="form"
    //         sx={{
    //           border: "1px solid black",
    //           minHeight: "120px",
    //           marginTop: "0px",
    //           padding: "15px",
    //           borderRadius: "8px",
    //         }} >
    //       {post && (
    //         <Box>
    //       {editing ? (
    //         <Box

    //           onSubmit={handleSubmit}
    //         >
    //         <h1 style={{ textAlign: "center" }}>Add Posts!</h1>
    //           <Box sx={{ marginBottom: "5px" }}>
    //             <TextField
    //               label="Title"
    //               variant="outlined"
    //               fullWidth
    //               required
    //               value={title}
    //               onChange={(e) => setTitle(e.target.value)}
    //               sx={{ marginBottom: 2 }}
    //             >
    //             </TextField>
    //           </Box>
    //           <Box sx={{ marginBottom: "5px" }}>
    //             <TextField
    //               label="Content"
    //               variant="outlined"
    //               fullWidth
    //               required
    //               value={content}
    //               onChange={(e) => setContent(e.target.value)}
    //               sx={{ marginBottom: 2 }}
    //             >
    //             </TextField>
    //           </Box>
    //           <Button type="submit" variant="contained">
    //           Save
    //           </Button>
    //         </Box>
    //       ):(
    //         <Box>
    //             <h1>{post.title}</h1>
    //             <h3>{post.content}</h3>
    //             </Box>
    //           )}
    //         </Box>
    //        )}
    //         <Box sx={{marginTop:"5px",display:"flex", justifyContent:"space-between"}}>
    //         <Button sx={{backgroundColor:"green"}} variant="contained" onClick={() =>router.push('/')}>Home</Button>
    //         <Button sx={{backgroundColor:"blue"}} variant="contained"  onClick={() => setEditing(!editing)}>Edit</Button>
    //         <Button sx={{backgroundColor:"red"}} variant="contained" onClick={handleDelete}>Delete</Button>
    //         </Box>
    //     </Box>
    //       </Grid>
    //     </Grid>
    //   </Container>

    <Container>
      <Card>
        {post && (
          <CardContent>
            {editing ? (
              <form onSubmit={handleSubmit}>
                {/* <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /> */}
                <Box sx={{ marginBottom: "5px" }}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  ></TextField>
                </Box>
                {/* <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea> */}

                <Box sx={{ marginBottom: "5px" }}>
                  <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  ></TextField>
                </Box>
                <Button type="submit" variant="contained">Save</Button>
              </form>
            ) : (
              <div>
                <h1>{post.title}</h1>
                <h3>{post.content}</h3>
              </div>
            )}
          </CardContent>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 5px",
          }}
        >
          <Button
            sx={{ backgroundColor: "green" }}
            variant="contained"
            onClick={() => router.push("/")}
          >
            Home
          </Button>
          <Button
            sx={{ backgroundColor: "blue" }}
            variant="contained"
            onClick={() => setEditing(!editing)}
          >
            Edit
          </Button>
          <Button
            sx={{ backgroundColor: "red" }}
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
