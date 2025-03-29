import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error

    // ✅ Validation checks
    if (title.length < 5) {
      setError("Title must be at least 5 characters long.");
      return;
    }
    if (content.length < 20) {
      setError("Content must be at least 20 characters long.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: serverTimestamp(),
      });

      alert("Post created successfully!");
      router.push("/admin");
    } catch (err) {
      setError("Error creating post. Please try again.");
    }
  };

  return (
    <ProtectedRoute>
      <Container>
        <Typography variant="h4" gutterBottom>Create New Post</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            error={title.length > 0 && title.length < 5}
            helperText={title.length > 0 && title.length < 5 ? "Minimum 5 characters required" : ""}
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            multiline
            rows={6}
            required
            error={content.length > 0 && content.length < 20}
            helperText={content.length > 0 && content.length < 20 ? "Minimum 20 characters required" : ""}
          />
          <Button type="submit" variant="contained" color="primary">Create Post</Button>
        </form>
      </Container>
    </ProtectedRoute>
  );
};

export default CreatePost;
