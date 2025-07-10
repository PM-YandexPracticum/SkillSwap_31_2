import React from 'react';

import styles from './second-step-form.module.css';
import { SecondStepFormUIProps } from './types';

import { InputAvatar } from '@ui/inputs/input-avatar/input-avatar';
import { ButtonUI } from '@ui/button';
import { Input } from '@ui/inputs/input/input';
import { DropdownCalendar } from '@ui/inputs/dropdown-calendar/dropdown-calendar';
import { DropdownGender } from '@ui/inputs/dropdown-gender/dropdown-gender';
import { DropdownCity } from '@ui/inputs/dropdown-city/dropdown-city';
import { DropdownSkill } from '@ui/inputs/dropdown-skill/dropdown-skill';

export const SecondStepFormUI: React.FC<SecondStepFormUIProps> = ({
  onSubmit,
  onBack,
  avatar,
  setAvatar,
  isNameValid,
  name,
  setName,
  date,
  onDateChange,
  isDateValid,
  gender,
  setGender,
  isGenderValid,
  cities,
  city,
  setCity,
  isCityValid,
  catOptions,
  cats,
  onCatChange,
  isCatValid,
  wishesOptions,
  wishes,
  onWishChange,
  isWishValid,
  isFormValid,
}) => (
  <form onSubmit={onSubmit}>
    <fieldset className={styles.formHolder}>
      <InputAvatar
        file={avatar}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAvatar(e.target.files ? `/images/${e.target.files[0].name}` : '');
        }}
      />
      <Input
        label="Имя"
        placeholder="Введите ваше имя"
        isValid={isNameValid}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.fieldRow}>
        <DropdownCalendar
          isValid={isDateValid}
          date={date}
          onChange={onDateChange}
          label="Дата рождения"
        />
        <DropdownGender
          label="Пол"
          value={gender}
          onChange={setGender}
          isValid={isGenderValid}
        />
      </div>
      <DropdownCity
        options={cities || []}
        value={city}
        onChange={setCity}
        isValid={isCityValid}
        label="Город"
      />
      <DropdownSkill
        options={catOptions || []}
        onChange={onCatChange}
        isValid={isCatValid}
        values={cats}
        label="Категория навыка, которому хотите научиться"
        placeholder="Выберите категорию"
      />
      <DropdownSkill
        options={wishesOptions || []}
        onChange={onWishChange}
        values={wishes}
        isValid={isWishValid}
        label="Подкатегория навыка, которому хотите научиться"
        placeholder="Выберите подкатегорию"
      />
      <div className={styles.buttonsRow}>
        <ButtonUI type="Secondary" onClick={onBack}>
          Назад
        </ButtonUI>
        <ButtonUI type="Primary" disabled={!isFormValid}>
          Продолжить
        </ButtonUI>
      </div>
    </fieldset>
  </form>
);
