import categories from '../../../public/db/categories.json';
import skills from '../../../public/db/skills.json';

export interface Skill {
  name: string;
  categoryId: number;
}

const fallbackColor = '#e8ecf7';
const moreTagsColor = '#e8ecf7';

export const getColorByNameOrCategory = (name: string): string => {
  if (name === 'more_tags') return moreTagsColor;

  const matchedSkill = skills.find((skill) => skill.name === name);
  if (matchedSkill) {
    const matchedCategory = categories.find(
      (category) => category.id === matchedSkill.category_id
    );
    if (!matchedCategory) return fallbackColor;

    if (matchedCategory.parent_id !== 0) {
      const parentCategory = categories.find(
        (category) => category.id === matchedCategory.parent_id
      );
      return parentCategory?.color || fallbackColor;
    }

    return matchedCategory.color || fallbackColor;
  }

  const matchedCategoryByName = categories.find(
    (category) => category.name === name
  );
  if (matchedCategoryByName) {
    if (matchedCategoryByName.parent_id !== 0) {
      const parentCategory = categories.find(
        (category) => category.id === matchedCategoryByName.parent_id
      );
      return parentCategory?.color || fallbackColor;
    }

    return matchedCategoryByName.color || fallbackColor;
  }

  return fallbackColor;
};

export const getSkillsFromCategoryIds = (categoryIds: number[]): Skill[] => {
  return categoryIds
    .map((id) => {
      const category = categories.find((cat) => cat.id === id);
      return category ? { name: category.name, categoryId: id } : null;
    })
    .filter(Boolean) as Skill[];
};
