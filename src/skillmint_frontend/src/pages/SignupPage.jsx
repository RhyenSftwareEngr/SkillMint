import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function SignupPage({ onSignup, user }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" />;

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = onSignup({ name, email, password });
    if (result.error) {
      setError(result.error);
    } else {
      setError("");
      navigate("/dashboard");
    }
  };
  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSignup}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}

export default SignupPage;
