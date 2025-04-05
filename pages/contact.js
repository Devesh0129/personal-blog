import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { GitHub, Twitter, Email, LinkedIn } from "@mui/icons-material"; // Import GitHub icon
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send email or store in a database)
    alert("Message Sent!");
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Contact Me
          </Typography>
          <Typography paragraph>
            If you have any questions, suggestions, or just want to say hello,
            feel free to reach out!
          </Typography>

          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Send Message
            </Button>
          </form>

          {/* Social Media Links */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1">
              Or reach out to me on social media:
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Link href="https://www.linkedin.com/in/deveshtalsania33/" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<LinkedIn />}
                  >
                    LinkedIn
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://github.com/Devesh0129" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<GitHub />}
                  >
                    GitHub
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="mailto:talsania.deveshh.29@gmail.com" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Email />}
                  >
                    Email
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;
