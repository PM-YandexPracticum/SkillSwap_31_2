import React from "react";
import { UserCard } from "./UserCard";

export default {
  title: "shared/UserCard",
  component: UserCard,
};

export const Default = () => (
  <UserCard
    avatarUrl="https://i.pravatar.cc/100"
    name="Иван"
    city="Санкт-Петербург"
    age={34}
    skillsToTeach={["Игра на барабанах"]}
    skillsToLearn={["Тайм менеджмент", "Медитация", "Финансы"]}
  />
);