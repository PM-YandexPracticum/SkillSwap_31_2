import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThirdStepFormUI } from '@features/auth/ui/widgets/third-step-form';
import { useDispatch, useSelector } from '@services/store';
import {
  backRegistrationStep,
  loginUserThunk,
  nextRegistrationStep,
  registerUserThunk,
} from '@features/auth/services/authSlice';
import { TRegistrationState } from '@entities/user.tsx';
import {
  getAllSubCategories,
  getCategories,
  getIsRegistration,
  getRegistrationData,
} from '@services/selectors.tsx';
import { addSkillThunk } from '@features/skills/skillsSlice.tsx';

export const ThirdStepForm: React.FC = () => {
  const dispatch = useDispatch();
  const { user, skill } = useSelector<TRegistrationState>(getRegistrationData);
  const [name, setName] = useState<string>(skill.name || '');
  const [category, setCategory] = useState<string>(skill.category || '');
  const [subcategory, setSubategory] = useState<string>(
    skill.subcategory || ''
  );
  const [description, setDescription] = useState<string>(
    skill.description || ''
  );
  const [images, setImages] = useState<string[]>(skill.images || []);

  const isRegistration = useSelector<boolean>(getIsRegistration);
  const navigate = useNavigate();

  const isFormValid =
    name.length > 0 &&
    category.length > 0 &&
    subcategory.length > 0 &&
    description.length > 0 &&
    images.length > 0;

  const onCatChange = (cats: string[]) => {
    setCategory(cats[0] || '');
  };
  const onSubcatChange = (cats: string[]) => {
    setSubategory(cats[0] || '');
  };

  const categories = useSelector(getCategories).map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const subCategories = useSelector(getAllSubCategories)
    .filter((item) => {
      return category === item.category_id;
    })
    .map((item) => ({
      id: item.id,
      name: item.name,
    }));
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      nextRegistrationStep({
        category,
        subcategory,
        name,
        description,
        images,
      })
    );
  };
  useEffect(() => {
    if (isRegistration) {
      dispatch(registerUserThunk(user))
        .then((data) => {
          console.log('adduser', data);
          return loginUserThunk({ email: user.email, password: user.password });
        })
        .then((data) => {
          console.log('login', data);
          return dispatch(
            addSkillThunk({
              category_id: skill.category || '',
              subcategory_id: skill.subcategory || '',
              name: skill.name,
              description: skill.description,
              images: skill.images,
            })
          );
        })
        .then((data) => {
          console.log('skill', data);
          navigate('/');
        });
    }
  }, [isRegistration, user, dispatch]);
  const onBack = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(backRegistrationStep());
  };

  return (
    <ThirdStepFormUI
      skillName={name}
      setSkillName={setName}
      catOptions={categories}
      cat={category}
      onCatChange={onCatChange}
      subcat={subcategory}
      subcatOptions={subCategories}
      onSubcatChange={onSubcatChange}
      description={description}
      setDescription={setDescription}
      images={images}
      setImages={setImages}
      onSubmit={onSubmit}
      isFormValid={isFormValid}
      onBack={onBack}
    />
  );
};
