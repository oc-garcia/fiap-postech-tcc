import Hero from '@/components/Hero/Hero';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import ShareIcon from '@mui/icons-material/Share';
import ExploreIcon from '@mui/icons-material/Explore';
import React from 'react'

const About = () => {
  return (
    <Box>
      <Hero title="Saiba Mais" subtitle="Lorem ipsum dolor sit amet" backgroundImage="/images/about-hero-image.jpg" />
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <SchoolIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">Criar Conteúdos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Crie conteúdos educativos personalizados para suas aulas. Com o EducaPro, você tem acesso a uma variedade de ferramentas que permitem criar materiais didáticos interativos e envolventes. Inspire seus alunos com conteúdos que atendam às suas necessidades específicas e estilos de aprendizado. Transforme suas ideias em realidade e veja o impacto positivo na sala de aula!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <ShareIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">Compartilhar Conteúdos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Compartilhe seus conteúdos com outros professores e receba feedback valioso. No EducaPro, acreditamos que a colaboração é a chave para o sucesso. Ao compartilhar seus materiais, você não só ajuda outros educadores, mas também recebe insights e sugestões que podem aprimorar ainda mais seus conteúdos. Juntos, podemos criar uma rede de apoio e inovação na educação!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <ExploreIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">Explorar Conteúdos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Explore e utilize conteúdos criados por outros educadores. Descubra uma vasta biblioteca de materiais didáticos que podem enriquecer suas aulas. Com o EducaPro, você tem acesso a recursos de alta qualidade que foram testados e aprovados por outros professores. Encontre inspiração e novas ideias para tornar suas aulas ainda mais dinâmicas e envolventes!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          Junte-se a nós e faça parte de uma comunidade de educadores dedicados a melhorar a qualidade da educação!
        </Typography>
      </Container>
    </Box>
  );
}

export default About;