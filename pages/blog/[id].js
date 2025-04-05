import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Typography, Card, CardContent, CardMedia, CircularProgress, Button } from "@mui/material";
import Link from "next/link";

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setPost(null);
        }
        setLoading(false);
      };

      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h5">❌ Post not found.</Typography>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Card>
        {/* Display Image */}
        <CardMedia
          component="img"
          height="400"
          image={post.image || "/images/blog-1.jpeg"} // Default image if no image in post
          alt={post.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            By {post.author} | {new Date(post.createdAt.seconds * 1000).toLocaleString()}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "20px" }}>
            {post.content}
          </Typography>
        </CardContent>
      </Card>

      <div style={{ marginTop: "20px" }}>
        <Link href="/blog" passHref>
          <Button variant="outlined" color="primary">
            Back to Blogs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
