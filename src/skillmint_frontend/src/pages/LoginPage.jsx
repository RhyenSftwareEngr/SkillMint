import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function LoginPage({ onLogin, user }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" />;

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = onLogin({ email, password });
    if (result.error) {
      setError(result.error);
    } else {
      setError("");
      navigate("/dashboard");
    }
  };
  const handleGoogleSuccess = (credentialResponse) => {
    // TODO: Handle Google OAuth success
  };
  const handleFacebookResponse = (response) => {
    // TODO: Handle Facebook OAuth success
  };
  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleEmailLogin}>
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
          Login
        </Button>
      </form>
      <Divider sx={{ my: 2 }}>or</Divider>
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} />
      {/* <Box mt={2}>
        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"
          callback={handleFacebookResponse}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              variant="contained"
              color="primary"
              fullWidth
            >
              Login with Facebook
            </Button>
          )}
        />
      </Box> */}
    </Box>
  );
}

export default LoginPage;
