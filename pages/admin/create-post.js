import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Store uploaded image URL
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result); // Set base64 preview
    };
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImageUrl(""); // Clear image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
        image: imageUrl, // Save image URL
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
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
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
          />

          {/* Image Upload Section */}
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>

          {/* Image Preview with Remove Option */}
          {imageUrl && (
            <Box sx={{ marginTop: 2, position: "relative" }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="140" image={imageUrl} alt="Uploaded Preview" />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Image Preview
                  </Typography>
                </CardContent>
              </Card>
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Create Post
          </Button>
        </form>
      </Container>
    </ProtectedRoute>
  );
};

export default CreatePost;
