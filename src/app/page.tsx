import Hero from "@/components/Hero/Hero";
import { Box, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ShareIcon from "@mui/icons-material/Share";
import ExploreIcon from "@mui/icons-material/Explore";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}>
      <Hero
        title="Bem-vindo ao EducaPro"
        subtitle="A plataforma para criação e compartilhamento de conteúdos educativos"
        backgroundImage="/images/home-hero-image.jpg"
      />
      <Container sx={{ my: 4, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'primary.main', height: '100%' }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: 'white' }}>
                <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
                <Typography variant="h6" component="h3">
                  Criar Conteúdos
                </Typography>
                <Typography variant="body2" align="center">
                  Crie conteúdos educativos personalizados e inspire suas aulas!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'primary.main', height: '100%' }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: 'white' }}>
                <ShareIcon fontSize="large" sx={{ color: 'white' }} />
                <Typography variant="h6" component="h3">
                  Compartilhar Conteúdos
                </Typography>
                <Typography variant="body2" align="center">
                  Compartilhe seus conteúdos e receba feedback valioso!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'primary.main', height: '100%' }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: 'white' }}>
                <ExploreIcon fontSize="large" sx={{ color: 'white' }} />
                <Typography variant="h6" component="h3">
                  Explorar Conteúdos
                </Typography>
                <Typography variant="body2" align="center">
                  Explore e utilize conteúdos criados por outros educadores!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;