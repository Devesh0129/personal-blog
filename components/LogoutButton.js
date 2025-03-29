import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../pages/firebaseConfig";
import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

const LogoutButton = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/login"); // Redirect to login after logout
      }, 2000);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="✅ Logged out successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default LogoutButton;
