import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext"; // Assuming you're using context for auth

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from the auth context or wherever you manage authentication
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login only if the user is not logged in
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  // Show a loading state or nothing until we confirm whether the user is logged in
  if (loading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  return <>{children}</>;
};

export default ProtectedRoute;
