// src/components/NavBar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "white", color: "black" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src="/logo2.svg"
            alt="SkillMint Logo"
            style={{ width: 40, marginRight: 8 }}
          />
          <Typography variant="h5" fontWeight={700}>
            <span style={{ color: "#2196f3" }}>Skill</span>
            <span style={{ color: "#43a047" }}>Mint</span>
          </Typography>
        </Box>
        <Box>
          <Button component={Link} to="/login" color="inherit" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #2196f3 0%, #43a047 100%)",
              color: "white",
              borderRadius: 2,
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
