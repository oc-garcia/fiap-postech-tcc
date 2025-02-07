"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Content } from "@prisma/client";
import ContentCard from "@/components/ContentCard/ContentCard";

const ContentPage = () => {
  const params = useParams<{ id: string }>();
  const contentId = params?.id;
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    if (!contentId) return;
    // Buscar o conteúdo usando o contentId (aqui pode ser o id ou um contentId customizado)
    const fetchContent = async () => {
      const res = await fetch(`/api/get-content-by-id?contentId=${contentId}`);
      const data = await res.json();
      setContent(data);
    };

    fetchContent();
  }, [contentId]);

  if (!content) return <p>Carregando... {contentId}</p>;

  return <ContentCard content={content} />;
};

export default ContentPage;
