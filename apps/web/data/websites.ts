export type Website = {
  title: string;
  category: string;
  href: string;
  description?: string;
  thumbnailUrl?: string;
  topics?: string[];
  createdAt?: string;
};

export const WEBSITES: Website[] = [];
