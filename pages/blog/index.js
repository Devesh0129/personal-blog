import { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Firebase config
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
          Blog Posts
        </Typography>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Card Media: Image */}
                <CardMedia
                  component="img"
                  height="200" // Set a fixed height for images
                  image={post.image || "/images/blog-1.jpeg"} // Default image
                  alt={post.title}
                  sx={{
                    objectFit: "cover", // Prevent distortion and ensure proper fit
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                  </Typography>
                </CardContent>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  href={`/blog/${post.id}`} // Link to individual blog post
                  sx={{ margin: 2 }}
                >
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default BlogPage;
