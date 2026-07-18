import { useEffect, useState } from "react";
import { StudentsContext } from "./StudentsContext";
import studentsData from "../../data/students";

const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : studentsData;
  });
  const [searchTerm, setSearchTerm] = useState("");

  const createStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  };

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();
    return student.name.toLowerCase().includes(search);
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <StudentsContext.Provider
      value={{
        students,
        createStudent,
        updateStudent,
        deleteStudent,
        searchTerm,
        setSearchTerm,
        filteredStudents,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
