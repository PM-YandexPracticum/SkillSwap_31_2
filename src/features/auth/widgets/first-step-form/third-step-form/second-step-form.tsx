import React, { SyntheticEvent, useEffect, useState } from 'react';

import { SecondStepFormUI } from '@features/auth/ui/widgets/second-step-form';
import { useDispatch, useSelector } from '@services/store';
import {
  backRegistrationStep,
  nextRegistrationStep,
} from '@features/auth/services/authSlice';
import { TRegistrationState } from '@entities/user.tsx';
import {
  getAllCities,
  getAllSubCategories,
  getCategories,
  getRegistrationData,
} from '@services/selectors.tsx';

export const SecondStepForm: React.FC = () => {
  const { user } = useSelector<TRegistrationState>(getRegistrationData);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string>(user?.avatar_url || '');
  const [name, setName] = useState<string>(user?.name || '');
  const [date, setDate] = useState<string>(user?.birthday || '');
  const [gender, setGender] = useState<string>(user?.gender || '');
  const [city, setCity] = useState<string>(user?.city || '');
  const [cats, setCategories] = useState<string[]>([]);
  const [wishes, setWishes] = useState<string[]>([]);

  const isFormValid: boolean =
    name.length > 0 &&
    date.length > 0 &&
    gender.length > 0 &&
    city.length > 0 &&
    wishes.length > 0;

  console.log({
    avatar,
    name,
    date,
    gender,
    city,
    cats,
    wishes,
  });

  const cities = useSelector(getAllCities);
  const categories = useSelector(getCategories).map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const subCategories = useSelector(getAllSubCategories)
    .filter((item) => {
      return cats.includes(item.category_id);
    })
    .map((item) => ({
      id: item.id,
      name: item.name,
    }));
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      nextRegistrationStep({
        avatar,
        name,
        date,
        gender,
        city,
        cats,
        wishes_ids: wishes,
      })
    );
  };
  const onBack = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(backRegistrationStep());
  };

  return (
    <SecondStepFormUI
      avatar={avatar}
      setAvatar={setAvatar}
      name={name}
      isNameValid
      setName={setName}
      date={date}
      onDateChange={setDate}
      isDateValid={date.length > 0}
      gender={gender}
      isGenderValid={!!gender}
      setGender={setGender}
      cities={cities}
      city={city}
      setCity={setCity}
      isCityValid={!!city}
      catOptions={categories}
      cats={cats}
      onCatChange={setCategories}
      isCatValid={!cats.length}
      wishesOptions={subCategories}
      onWishChange={setWishes}
      wishes={wishes}
      isWishValid={!wishes.length}
      onSubmit={onSubmit}
      isFormValid={isFormValid}
      onBack={onBack}
    />
  );
};
