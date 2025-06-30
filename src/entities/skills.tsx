export type TSkill = {
  category: string | null;
  subcategory: string | null;
  id: string;
  name: string;
  description: string;
  images: string[];
  owner_id: string;
  created_at: string;
  modified_at: string;
  is_liked: boolean;
};
