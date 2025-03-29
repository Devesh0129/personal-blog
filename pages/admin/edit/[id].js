import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const post = docSnap.data();
        setTitle(post.title);
        setContent(post.content);
      } else {
        alert("Post not found!");
        router.push("/admin");
      }
    };
    fetchPost();
  }, [id, router]);

  const handleUpdate = async (e) => {
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
      await updateDoc(doc(db, "posts", id), { title, content });
      alert("Post updated successfully!");
      router.push("/admin");
    } catch (err) {
      setError("Error updating post. Please try again.");
    }
  };

  return (
    <ProtectedRoute>
      <Container>
        <Typography variant="h4" gutterBottom>Edit Post</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleUpdate}>
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
          <Button type="submit" variant="contained" color="primary">Update Post</Button>
        </form>
      </Container>
    </ProtectedRoute>
  );
};

export default EditPost;
