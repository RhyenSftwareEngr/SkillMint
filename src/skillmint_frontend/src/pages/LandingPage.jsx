// src/pages/LandingPage.jsx
import { Box, Typography, Button, Chip, Stack, Container } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function LandingPage() {
  return (
    <Box
      minHeight="100vh"
      bgcolor="linear-gradient(to bottom, #f7faff, #e3f2fd)"
    >
      <NavBar />

      <Container
        maxWidth="md"
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Chip
          label="🇵🇭 Empowering Filipino ICT Students"
          color="primary"
          sx={{
            mb: 3,
            bgcolor: "#dbeafe",
            color: "#1e3a8a",
            fontWeight: 600,
            px: 2,
            py: 1,
            fontSize: "0.875rem",
          }}
        />

        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            background: "linear-gradient(90deg, #7b2ff2, #f357a8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
          }}
        >
          Skills. Proof. Success.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.125rem" },
          }}
        >
          A decentralized platform designed to assist ICT students in the
          Philippines in building verified, blockchain-based portfolios by
          participating in real-world learning experiences such as hackathons,
          bootcamps, and bounties. The platform connects students to
          communities, events, and opportunities while providing tools to
          showcase their growth, achievements, and identity through NFT
          credentials and event-linked records on the Internet Computer
          Protocol.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            component={Link}
            to="/signup"
            size="large"
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #4f46e5, #22d3ee)",
              color: "white",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Start Building
          </Button>

          {/* <Button
            component={Link}
            to="/demo"
            size="large"
            variant="outlined"
            sx={{
              color: "#1f2937",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderColor: "#cbd5e1",
              backgroundColor: "#fff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f1f5f9",
              },
            }}
          >
            Try Demo
          </Button> */}
        </Stack>
      </Container>
    </Box>
  );
}
