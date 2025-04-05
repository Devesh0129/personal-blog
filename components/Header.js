import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "white" }}>
            My Blog
          </Link>
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        {/* <Button color="inherit" component={Link} href="/about">
          About
        </Button> */}
        <Button color="inherit" component={Link} href="/contact">
          Contact
        </Button>
        <Button color="inherit" component={Link} href="/admin">
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;