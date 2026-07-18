import { Search } from "lucide-react";
import { useStudents } from "../../hooks/useStudents";

import Input from "../ui/Input";
import Button from "../ui/Button";
// import StudentModal from "./StudentModal";

const StudentsHeader = ({ onAddStudent }) => {
  const { searchTerm, setSearchTerm } = useStudents();
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="w-full max-w-md">
        <Input
          type="text"
          placeholder="ابحث باسم الطالب..."
          icon={Search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button onClick={onAddStudent}>إضافة طالب</Button>
      {/* <StudentModal /> */}
    </div>
  );
};

export default StudentsHeader;
