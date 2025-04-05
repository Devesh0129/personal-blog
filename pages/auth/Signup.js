import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  // Handle Back Button - Prevent Going to Home Page
  useEffect(() => {
    const handleBack = (event) => {
      event.preventDefault();
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  // Handle Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSnackbarMessage("✅ Sign-Up Successful!");
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/"); // Redirect after success
      }, 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setSnackbarMessage(
          "⚠️ Email is already in use. Try logging in instead."
        );
      } else {
        setSnackbarMessage(`❌ ${error.message}`);
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSignUp}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
        </form>
        {/* Login Button */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button color="secondary" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </Typography>
        {/* Snackbar for Showing Messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Box>
    </Container>
  );
};

export default SignUp;
