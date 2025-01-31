import { Box, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          backgroundImage: 'url("/images/home-hero-image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay with 50% opacity
          }}
        />
        <Box
          sx={{
            position: "relative",
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Bem-vindo ao EducaPro
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ fontWeight: "bold" }}>
            A plataforma para criação e compartilhamento de conteúdos educativos
          </Typography>
        </Box>
      </Box>
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Sobre o EducaPro
        </Typography>
        <Typography variant="body1" paragraph>
          O EducaPro é uma plataforma dedicada a ajudar professores a criar conteúdos educativos de alta qualidade para suas salas de aula. Aqui, você pode criar, compartilhar e descobrir conteúdos criados por outros professores, tudo em um formato colaborativo e fácil de usar.
        </Typography>
        <Typography variant="body1" paragraph>
          Nossa missão é facilitar o compartilhamento de conhecimento e recursos entre educadores, promovendo uma comunidade de aprendizado contínuo e apoio mútuo. Com o EducaPro, você pode:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" paragraph>
              Criar conteúdos educativos personalizados para suas aulas.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Compartilhar seus conteúdos com outros professores e receber feedback.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Explorar e utilizar conteúdos criados por outros educadores.
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" paragraph>
          Junte-se a nós e faça parte de uma comunidade de educadores dedicados a melhorar a qualidade da educação!
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;