import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import LogoutButton from "../../components/LogoutButton"; // Logout button
import Sidebar from "../../components/AdminSidebar"; // Sidebar for navigation
// import Header from "../../components/AdminHeader"; // Header for admin panel
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      setIsAuthenticated(!!user); // Convert user to boolean
      if (!user) router.push("/auth/login");
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (!user) router.push("/auth/login");
    });

    checkAuth();
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      };
      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <ProtectedRoute>
      {/* <Header /> Admin Header */}
      <Box display="flex">
        <Sidebar />{" "}
        <Container sx={{ mt: 4, flexGrow: 1 }}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/admin/create-post")}
              sx={{ my: 3 }}
            >
              Create New Post
            </Button>
            <LogoutButton />
          </Box>

          <Grid container spacing={3}>
            {posts.length === 0 ? (
              <Typography>No posts found.</Typography>
            ) : (
              posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={post.image || "/images/blog-1.jpeg"} // Default image
                      alt={post.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{post.title}</Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {post.content.substring(0, 100)}...
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="primary"
                        onClick={() => router.push(`/admin/edit/${post.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
