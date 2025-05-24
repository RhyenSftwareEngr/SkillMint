import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h2" gutterBottom>
        SkillMint
      </Typography>
      <Typography variant="h5" gutterBottom>
        Empowering ICT students in the Philippines with decentralized skill
        verification and event participation.
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
        sx={{ mt: 4, mr: 2 }}
      >
        Login
      </Button>
      <Button
        component={Link}
        to="/signup"
        variant="outlined"
        color="primary"
        sx={{ mt: 4 }}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default LandingPage;
