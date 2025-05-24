import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function LoginPage() {
  const handleEmailLogin = (e) => {
    e.preventDefault();
    // TODO: Implement email login logic
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
      <Box mt={2}>
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
      </Box>
    </Box>
  );
}

export default LoginPage;
