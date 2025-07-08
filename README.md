# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
### Создание БД:

```sql
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cities (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  CONSTRAINT cities_pkey PRIMARY KEY (id)
);
CREATE TABLE public.favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  favorite_id uuid NOT NULL,
  CONSTRAINT favorites_pkey PRIMARY KEY (id),
  CONSTRAINT favorites_favorite_id_fkey FOREIGN KEY (favorite_id) REFERENCES public.users(id),
  CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.gender (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  CONSTRAINT gender_pkey PRIMARY KEY (id)
);
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  suggestion_id uuid NOT NULL,
  user_id uuid NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  sender_id uuid NOT NULL,
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT notifications_suggestion_id_fkey FOREIGN KEY (suggestion_id) REFERENCES public.suggestions(id)
);
CREATE TABLE public.skills (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category_id uuid,
  subcategory_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  modified_at timestamp without time zone NOT NULL DEFAULT now(),
  description text,
  images ARRAY,
  name text NOT NULL,
  owner_id uuid NOT NULL,
  CONSTRAINT skills_pkey PRIMARY KEY (id),
  CONSTRAINT skills_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT skills_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategories(id),
  CONSTRAINT skills_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id)
);
CREATE TABLE public.subcategories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category_id uuid NOT NULL,
  CONSTRAINT subcategories_pkey PRIMARY KEY (id),
  CONSTRAINT subcategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.suggestions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  skill_id uuid NOT NULL,
  who_ask_id uuid NOT NULL,
  accepted boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  modified_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT suggestions_pkey PRIMARY KEY (id),
  CONSTRAINT suggestions_who_ask_id_fkey FOREIGN KEY (who_ask_id) REFERENCES public.users(id),
  CONSTRAINT suggestions_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id)
);
CREATE TABLE public.user_favorites_skills (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  skill_id uuid NOT NULL,
  CONSTRAINT user_favorites_skills_pkey PRIMARY KEY (id),
  CONSTRAINT user_favorites_skills_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT user_favorites_skills_skill_id_fkey1 FOREIGN KEY (skill_id) REFERENCES public.skills(id),
  CONSTRAINT user_favorites_skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT user_favorites_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id)
);
CREATE TABLE public.user_wishes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subcategory_id uuid NOT NULL,
  CONSTRAINT user_wishes_pkey PRIMARY KEY (id),
  CONSTRAINT user_wishes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT user_wishes_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategories(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  modified_at timestamp without time zone NOT NULL DEFAULT now(),
  about text,
  avatar_url text,
  email text NOT NULL UNIQUE,
  gender_id uuid,
  city_id uuid,
  name text UNIQUE,
  password text NOT NULL,
  birthday date,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id),
  CONSTRAINT users_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES public.gender(id)
);
```