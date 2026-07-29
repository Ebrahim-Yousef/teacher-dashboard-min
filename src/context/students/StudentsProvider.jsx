import { useEffect, useState } from "react";
import { StudentsContext } from "./StudentsContext";
import studentsData from "../../data/students";

const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : studentsData;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [studentsPerPage, setStudentsPerPage] = useState(5);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStageChange = (value) => {
    setSelectedStage(value);
    setSelectedGrade("");
    setCurrentPage(1);
  };

  const handleGradeChange = (value) => {
    setSelectedGrade(value);
    setCurrentPage(1);
  };

  const handleLimitChange = (limit) => {
    setStudentsPerPage(limit);
    setCurrentPage(1);
  };

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
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStage = !selectedStage || student.stage === selectedStage;
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    return matchesSearch && matchesStage && matchesGrade;
  });

  const totalStudents = filteredStudents.length;

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage,
  );

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStage("");
    setSelectedGrade("");
    setCurrentPage(1);
  };

  return (
    <StudentsContext.Provider
      value={{
        students,
        createStudent,
        updateStudent,
        deleteStudent,
        searchTerm,
        setSearchTerm: handleSearchChange,
        selectedStage,
        setSelectedStage: handleStageChange,
        selectedGrade,
        setSelectedGrade: handleGradeChange,
        filteredStudents,
        currentPage,
        setCurrentPage,
        studentsPerPage,
        setStudentsPerPage: handleLimitChange,
        totalPages,
        paginatedStudents,
        totalStudents,
        clearFilters,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
