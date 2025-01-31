import Hero from "@/components/Hero/Hero";
import { Box, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Hero
        title="Bem-vindo ao EducaPro"
        subtitle="A plataforma para criação e compartilhamento de conteúdos educativos"
        backgroundImage="/images/home-hero-image.jpg"
      />
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