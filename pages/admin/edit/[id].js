import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextField, Button, Typography, Alert, Box, Card, CardMedia, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query; // Get the post id from the URL query parameters

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Store new uploaded image URL
  const [existingImageUrl, setExistingImageUrl] = useState(""); // Existing image URL from Firestore
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        const postRef = doc(db, "posts", id);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setContent(postData.content);
          console.log(postData , 'pdd')
          setExistingImageUrl(postData.image || ""); // Set the existing image URL or empty string
        } else {
          setError("Post not found.");
        }
      };
      fetchPostData();
    }
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get selected file
    if (!file) return;

    const storageRef = ref(storage, `posts/${file.name}`); // Create reference for Firebase storage
    await uploadBytes(storageRef, file); // Upload the file
    const url = await getDownloadURL(storageRef); // Get the URL after upload
    setImageUrl(url); // Store the new image URL
  };

  const handleRemoveImage = () => {
    setImageUrl(""); // Remove the newly uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error

    if (title.length < 5) {
      setError("Title must be at least 5 characters long.");
      return;
    }
    if (content.length < 20) {
      setError("Content must be at least 20 characters long.");
      return;
    }

    try {
      // If a new image is uploaded, use it, otherwise keep the existing image
      const updatedImageUrl = imageUrl || existingImageUrl;

      // Update the post document in Firestore with new data
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        title,
        content,
        image: updatedImageUrl, // Store image URL in Firestore
      });

      alert("Post updated successfully!");
      router.push("/admin"); // Redirect to the admin dashboard
    } catch (err) {
      setError("Error updating post. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
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

        {/* Display existing image if there is one */}
        {existingImageUrl && !imageUrl && (
          <Box sx={{ marginTop: 2 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="140" image={existingImageUrl} alt="Existing Image" />
            </Card>
          </Box>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Update Post
        </Button>
      </form>
    </Box>
  );
};

export default EditPost;
