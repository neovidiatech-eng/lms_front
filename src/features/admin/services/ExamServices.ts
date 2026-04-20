import api from "../../../lib/axios";

//get all getExamSchema
export const getExams = async () => {
  const response = await api.get("/exams/");
  return response.data;
};
