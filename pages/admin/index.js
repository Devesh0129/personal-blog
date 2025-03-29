import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Button, Container, Typography, Card, CardContent, CardActions } from "@mui/material";
import LogoutButton from "../../components/LogoutButton"; // Import logout button

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for Firebase auth state persistence
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
        router.push("/login"); // Redirect to login if not logged in
      }
    };

    // Check the authentication state when the component mounts
    checkAuth();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
        router.push("/login"); // Redirect to login if not logged in
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    // Fetch posts from Firestore once the user is authenticated
    if (isAuthenticated) {
      const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      <Container>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push("/admin/create-post")}>
          Create New Post
        </Button>
        <LogoutButton /> {/* Add logout button */}

        {posts.length === 0 ? (
          <Typography>No posts found.</Typography>
        ) : (
          posts.map((post) => (
            <Card key={post.id} style={{ marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{post.content.substring(0, 100)}...</Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={() => router.push(`/admin/edit/${post.id}`)}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(post.id)}>Delete</Button>
              </CardActions>
            </Card>
          ))
        )}
      </Container>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
