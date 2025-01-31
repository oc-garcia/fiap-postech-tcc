import Hero from '@/components/Hero/Hero';
import { Box } from '@mui/material';
import React from 'react'

const About = () => {
  return (
    <Box>
      <Hero title="Saiba Mais" subtitle="Lorem ipsum dolor sit amet" backgroundImage="/images/about-hero-image.jpg" />
    </Box>
  );
}

export default About;
