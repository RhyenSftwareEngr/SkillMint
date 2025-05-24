import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Tabs,
  Tab,
  Grid,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import {
  Event as EventIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  People as PeopleIcon,
  Notifications as BellIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Place as PlaceIcon,
  CalendarMonth as CalendarIcon,
  Bolt as BoltIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Example data
  const upcomingEvents = [
    {
      id: 1,
      title: "Manila Blockchain Hackathon 2025",
      type: "Hackathon",
      date: "Feb 15-17, 2025",
      location: "BGC, Taguig",
      participants: 150,
      prize: "₱100,000",
      organizer: "Blockchain Philippines",
      featured: true,
    },
    {
      id: 2,
      title: "AI/ML Workshop Series",
      type: "Workshop",
      date: "Feb 20, 2025",
      location: "UP Diliman",
      participants: 50,
      organizer: "UPCS",
      featured: false,
    },
    {
      id: 3,
      title: "Cebu Tech Bootcamp",
      type: "Bootcamp",
      date: "Mar 1-5, 2025",
      location: "Cebu City",
      participants: 80,
      organizer: "CebuTech",
      featured: true,
    },
    {
      id: 4,
      title: "Bulacan Tech Bootcamp",
      type: "Bootcamp",
      date: "Mar 1-7, 2025",
      location: "Bulacan City",
      participants: 190,
      organizer: "BulacanTech",
      featured: true,
    },
    {
      id: 5,
      title: "Davao Tech Bootcamp",
      type: "Bootcamp",
      date: "Mar 1-7, 2025",
      location: "Davao City",
      participants: 120,
      organizer: "DavaoTech",
      featured: true,
    },
  ];

  const recentBadges = [
    { name: "JavaScript Ninja", issuer: "DevCon PH", date: "Jan 2025" },
    { name: "Hackathon Winner", issuer: "TechFest Manila", date: "Dec 2024" },
    { name: "React Expert", issuer: "Frontend Masters PH", date: "Nov 2024" },
  ];

  const stats = [
    {
      label: "Events Attended",
      value: "12",
      icon: <CalendarIcon color="primary" />,
    },
    { label: "NFT Badges", value: "8", icon: <TrophyIcon color="warning" /> },
  ];

  function EventCard({ event }) {
    return (
      <Box
        sx={{
          border: "2px solid #1976d2",
          borderRadius: 3,
          p: 3,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.04)",
          background: "#fff",
        }}
      >
        <Box flex={1} minWidth={0}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Typography variant="h5" fontWeight={700} noWrap>
              {event.title}
            </Typography>
            {event.featured && (
              <Chip
                icon={<BoltIcon sx={{ color: "#fff" }} />}
                label="Featured"
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 2,
                  ml: 1,
                }}
                size="small"
              />
            )}
          </Stack>
          <Stack direction="row" spacing={3} mb={1} flexWrap="wrap">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CalendarIcon fontSize="small" />
              <Typography fontSize={15}>{event.date}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PlaceIcon fontSize="small" />
              <Typography fontSize={15}>{event.location}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PeopleIcon fontSize="small" />
              <Typography fontSize={15}>
                {event.participants} participants
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Chip
              label={event.type}
              sx={{
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600,
                borderRadius: 2,
              }}
              size="small"
            />
            <Typography fontSize={15} color="text.secondary">
              by {event.organizer}
            </Typography>
            {event.prize && (
              <Chip
                label={`Prize: ${event.prize}`}
                sx={{
                  bgcolor: "#bbf7d0",
                  color: "#15803d",
                  fontWeight: 600,
                  borderRadius: 2,
                  ml: 1,
                }}
                size="small"
              />
            )}
          </Stack>
        </Box>
        <Stack spacing={2} alignItems="flex-end" ml={3}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              minWidth: 140,
            }}
          >
            Register Now
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              color: "#222",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              minWidth: 140,
              borderColor: "#e0e0e0",
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Box>
    );
  }

  const projects = [
    {
      image: "/images/map-demo.jpg",
      status: "Applications Open",
      statusColor: "#1e40af",
      category: "AI Innovation Project",
      categoryColor: "#2563eb",
      title:
        "TerraScan AI: Real-Time Mining-Site Locator for North America & South Africa - Omdena",
      description:
        "Discover TerraScan's AI-powered mining monitoring platform for real-time location intelligence, safety, and environmental compliance in North America and Africa.",
    },
    {
      image: "/images/bhutan-demo.jpg",
      status: "Applications Open",
      statusColor: "#1e40af",
      category: "Local Chapter Project",
      categoryColor: "#b45309",
      title: "Leveraging AI to Combat Climate Change in Bhutan",
      description:
        "Climate change is one of the most pressing global challenges, leading to extreme weather events, rising sea levels, biodiversity loss, and resource scarcity. Bhutan is increasingly vulnerable to climate-related risks such as glacial lake outburst floods.",
    },
  ];

  return (
    <Box
      minHeight="100vh"
      sx={{ background: "linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)" }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: 1,
          borderColor: "divider",
          px: { xs: 2, md: 6 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "linear-gradient(90deg, #2196f3 0%, #43a047 100%)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
            }}
          >
            <Typography variant="h6" color="white" fontWeight={700}>
              S
            </Typography>
          </Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              background: "linear-gradient(90deg, #2196f3 0%, #43a047 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SkillMint
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="text" color="inherit">
            <BellIcon />
          </Button>
          <Button variant="text" color="inherit">
            <SettingsIcon />
          </Button>
          <Avatar
            src="/placeholder.svg"
            alt="User"
            sx={{ width: 40, height: 40 }}
          />
          <Button variant="text" color="inherit" onClick={() => navigate("/")}>
            <LogoutIcon />
          </Button>
        </Stack>
      </Box>

      <Box maxWidth="lg" mx="auto" px={2} py={4}>
        {/* Welcome Section */}
        <Typography variant="h4" fontWeight={700} mb={1}>
          Welcome back, Anonymous! 👋
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Ready to discover new opportunities and showcase your skills?
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4} alignItems="stretch">
          {stats.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx} sx={{ display: "flex" }}>
              <Card
                sx={{
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Box mb={1}>{stat.icon}</Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Events" />
          <Tab label="Profile" />
          <Tab label="Badges" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {/* Tab Panels */}
        {tab === 0 && (
          <Box>
            {/* Search and Filters */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
              <Box sx={{ position: "relative", flex: 1 }}>
                <SearchIcon
                  sx={{
                    position: "absolute",
                    left: 12,
                    top: 18,
                    color: "grey.400",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search events by title, location, or organizer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    borderRadius: 8,
                    border: "1px solid #e0e0e0",
                    fontSize: 16,
                  }}
                />
              </Box>
              <Button variant="outlined" startIcon={<TrendingUpIcon />}>
                Filters
              </Button>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg, #2196f3 0%, #43a047 100%)",
                  color: "white",
                  fontWeight: 600,
                }}
                onClick={() => navigate("/events")}
              >
                View All Events
              </Button>
            </Stack>

            {/* Trending badge */}
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Chip
                icon={<TrendingUpIcon sx={{ color: "#ea580c" }} />}
                label="Trending"
                sx={{
                  bgcolor: "#fef3c7",
                  color: "#ea580c",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                }}
                size="small"
              />
            </Box>

            {/* Modern 2-column image cards */}
            <Grid container spacing={4}>
              {upcomingEvents.map((event, idx) => (
                <Grid item xs={12} md={6} key={event.id}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: 4,
                      bgcolor: "transparent",
                      mb: 2,
                      position: "relative",
                      minHeight: 340,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image Header */}
                    <Box
                      sx={{
                        height: 180,
                        background: `url(https://source.unsplash.com/random/600x400?sig=${idx}) center/cover no-repeat`,
                        position: "relative",
                      }}
                    >
                      <Chip
                        label={
                          event.featured ? "Applications Open" : "Event Open"
                        }
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          bgcolor: event.featured ? "#1e40af" : "#2563eb",
                          color: "#fff",
                          fontWeight: 600,
                          borderRadius: 2,
                          px: 2,
                          py: 0.5,
                          fontSize: 14,
                        }}
                      />
                    </Box>
                    {/* Overlay Content */}
                    <Box
                      sx={{
                        background:
                          "linear-gradient(180deg, rgba(30,64,175,0.85) 60%, rgba(30,64,175,0.7) 100%)",
                        color: "#f3f4f6",
                        p: 3,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                        minHeight: 160,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Chip
                        label={event.type}
                        sx={{
                          bgcolor: "#2563eb",
                          color: "#fff",
                          fontWeight: 600,
                          borderRadius: 2,
                          mb: 1,
                          fontSize: 13,
                        }}
                        size="small"
                      />
                      <Typography variant="h6" fontWeight={700} mb={1}>
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#e0e7ef", opacity: 0.95, mb: 1 }}
                      >
                        {event.date} • {event.location} • {event.participants}{" "}
                        participants
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#e0e7ef", opacity: 0.95 }}
                      >
                        Organized by {event.organizer}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Card sx={{ boxShadow: 3, borderRadius: 3, mb: 3 }}>
              <CardHeader
                avatar={
                  <Avatar
                    src="/placeholder.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                }
                title={<Typography variant="h6">Juan Dela Cruz</Typography>}
                subheader="Computer Science Student, UP Diliman"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography
                        variant="h5"
                        color="success.main"
                        fontWeight={700}
                      >
                        12
                      </Typography>
                      <Typography fontSize={14}>Events Joined</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography
                        variant="h5"
                        color="secondary.main"
                        fontWeight={700}
                      >
                        8
                      </Typography>
                      <Typography fontSize={14}>NFT Badges</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    background:
                      "linear-gradient(90deg, #2196f3 0%, #43a047 100%)",
                    color: "white",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Recent NFT Badges
              <Button variant="outlined" size="small" sx={{ ml: 2 }}>
                View All Badges
              </Button>
            </Typography>
            <Grid container spacing={3}>
              {recentBadges.map((badge, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card
                    sx={{ textAlign: "center", boxShadow: 3, borderRadius: 3 }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          mx: "auto",
                          mb: 2,
                          bgcolor:
                            "linear-gradient(90deg, #ffeb3b 0%, #ff9800 100%)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TrophyIcon sx={{ color: "white", fontSize: 32 }} />
                      </Box>
                      <Typography fontWeight={700}>{badge.name}</Typography>
                      <Typography fontSize={14} color="text.secondary">
                        Issued by {badge.issuer}
                      </Typography>
                      <Typography fontSize={12} color="text.secondary">
                        {badge.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Card
              sx={{
                mt: 4,
                background: "linear-gradient(90deg, #2196f3 0%, #43a047 100%)",
                color: "white",
                textAlign: "center",
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <TrophyIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={700}>
                  Earn More Badges!
                </Typography>
                <Typography mb={2}>
                  Participate in events and complete challenges to earn verified
                  NFT credentials.
                </Typography>
                <Button variant="contained" color="secondary">
                  Discover Opportunities
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
