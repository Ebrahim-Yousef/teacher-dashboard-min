import { useContext } from "react";
import { StudentsContext } from "../context/students/StudentsContext";

export const useStudents = () => {
  return useContext(StudentsContext);
};
