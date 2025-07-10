import React from 'react';

import styles from './third-step-form.module.css';
import { ThirdStepFormUIProps } from './types';

import { ButtonUI } from '@ui/button';
import { Input } from '@ui/inputs/input/input';
import { DropdownSkill } from '@ui/inputs/dropdown-skill/dropdown-skill';
import { Textarea } from '@ui/inputs/textarea/textarea';
import { ImageUploader } from '@ui/image-uploader';

export const ThirdStepFormUI: React.FC<ThirdStepFormUIProps> = ({
  onSubmit,
  onBack,
  isFormValid,
  skillName,
  setSkillName,
  catOptions,
  cat,
  onCatChange,
  subcatOptions,
  subcat,
  onSubcatChange,
  description,
  setDescription,
  images,
  setImages,
}) => (
  <form onSubmit={onSubmit}>
    <fieldset className={styles.formHolder}>
      <Input
        label="Название навыка"
        placeholder="Введите название вашего навыка"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      />
      <DropdownSkill
        options={catOptions || []}
        onChange={onCatChange}
        isValid
        values={[cat]}
        label="Категория навыка"
        placeholder="Выберите категорию"
      />
      <DropdownSkill
        options={subcatOptions || []}
        onChange={onSubcatChange}
        values={[subcat]}
        isValid
        label="Подкатегория навыка"
        placeholder="Выберите подкатегорию"
      />
      <Textarea
        label="Описание"
        placeholder="Коротко опишите, чему можете научить"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ImageUploader
        label="Выбрать изображения"
        placeholder="Перетащите или выберите изображения навыка"
        values={images}
        onChange={setImages}
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
