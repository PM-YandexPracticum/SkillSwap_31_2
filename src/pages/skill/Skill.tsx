import { getSkillById } from "@app/services/selectors";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Skill = () => {
  const id = useParams().id;
  const skill = useSelector(getSkillById(id!.slice(1)));
  console.log(skill);
  return (
    <>
      Кекать хочу
    </>
  );
};
