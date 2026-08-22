import api from "./apiClient";

export const getSubjects = async (isActive) => {
  const params = typeof isActive === "boolean" ? { isActive } : {};
  const response = await api.get("/subjects", { params });
  return response.data;
};

export const createSubject = async (subjectData) => {
  const response = await api.post("/subjects", subjectData);
  return response.data;
};

export const getSubjectById = async (id) => {
  const response = await api.get(`/subjects/${id}`);
  return response.data;
};

export const updateSubject = async (id, subjectData) => {
  const response = await api.patch(`/subjects/${id}`, subjectData);
  return response.data;
};

export const deleteSubject = async (id) => {
  const response = await api.delete(`/subjects/${id}`);
  return response.data;
};

// --- Branches Endpoints ---

export const createBranch = async (subjectId, branchData) => {
  const response = await api.post(
    `/subjects/${subjectId}/branches`,
    branchData,
  );
  return response.data;
};

export const updateBranch = async (subjectId, branchId, branchData) => {
  const response = await api.patch(
    `/subjects/${subjectId}/branches/${branchId}`,
    branchData,
  );
  return response.data;
};

export const deleteBranch = async (subjectId, branchId) => {
  const response = await api.delete(
    `/subjects/${subjectId}/branches/${branchId}`,
  );
  return response.data;
};
