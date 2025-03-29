import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the blog page on page load
    router.push("/blog");
  }, [router]);

  return null; // You don't need to render anything on the home page since it redirects automatically
}