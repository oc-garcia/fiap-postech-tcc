import React from "react";
import { Paper, Typography, List, ListItem, ListItemText, Skeleton, Box } from "@mui/material";
import { UserWithDetails } from "@/services/getUserWithDetails";
import ContentCard from "../ContentCard/ContentCard";

interface UserProfileCardProps {
  user: UserWithDetails | null;
  loading: boolean;
  refreshUser: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, loading, refreshUser }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Informações da Conta
      </Typography>
      {loading ? (
        <List>
          <ListItem>
            <ListItemText primary="Nome" secondary={<Skeleton width="60%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary="E-mail" secondary={<Skeleton width="80%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preferências de Conteúdo" secondary={<Skeleton width="50%" />} />
          </ListItem>
          <Box sx={{ display: "flex" }}>
            <ListItem>
              <ListItemText primary="Comentários" secondary={<Skeleton width="30%" />} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Votos" secondary={<Skeleton width="30%" />} />
            </ListItem>
          </Box>
          <ListItem>
            <ListItemText primary="Conteúdos Criados" secondary={<Skeleton width="30%" />} />
          </ListItem>
        </List>
      ) : user ? (
        <List>
          <ListItem>
            <ListItemText primary="Nome" secondary={user.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="E-mail" secondary={user.email} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Preferências de Conteúdo"
              secondary={user.contentPreferences || "Nenhuma preferência definida"}
            />
          </ListItem>
          <Box sx={{ display: "flex" }}>
            <ListItem>
              <ListItemText primary="Comentários" secondary={user.comments.length} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Votos" secondary={user.votes.length} />
            </ListItem>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Conteúdos Criados
            </Typography>
            {user.createdContents.map((content) => {
              return (
                <ContentCard 
                  key={content.id} 
                  content={content} 
                  isPreview={false} 
                  onVoteSuccess={refreshUser} 
                />
              );
            })}
          </Box>
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Erro ao carregar informações do usuário.
        </Typography>
      )}
    </Paper>
  );
};

export default UserProfileCard;