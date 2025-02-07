"use client";

import React, { useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Hero from "@/components/Hero/Hero";
import { getUserWithDetails, UserWithDetails } from "@/services/getUserWithDetails";
import { AuthContext } from "@/context/AuthContext";
import UserProfileCard from "@/components/UserProfileCard/UserProfileCard";

const Account = () => {
  const [user, setUser] = useState<UserWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const data = await getUserWithDetails(token);
      setUser(data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserWithDetails(token);
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Hero
        title="Conta"
        subtitle="Gerencie suas informações e preferências"
        backgroundImage="/images/account-hero-image.jpg"
      />
      <Container
        sx={{
          my: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <UserProfileCard user={user} loading={loading} refreshUser={refreshUser} />
      </Container>
    </Box>
  );
};

export default Account;