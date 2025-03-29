import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsArray);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Typography variant="h3" gutterBottom>📚 Blog Posts</Typography>

      {posts.length === 0 ? (
        <Typography variant="h6">No blog posts available.</Typography>
      ) : (
        posts.map(post => (
          <Card key={post.id} style={{ marginBottom: "20px" }}>
            <CardContent>
              {/* 🔗 Clickable Title to Navigate to post/[id].js */}
              <Link href={`/blog/${post.id}`} passHref>
                <Typography variant="h5" style={{ cursor: "pointer", color: "blue" }}>
                  {post.title}
                </Typography>
              </Link>

              <Typography variant="body2" color="textSecondary">
                By {post.author} | {new Date(post.createdAt.seconds * 1000).toLocaleString()}
              </Typography>

              <Typography variant="body1" style={{ marginTop: "10px" }}>
                {post.content.slice(0, 100)}... {/* Show preview, not full content */}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Blog;
