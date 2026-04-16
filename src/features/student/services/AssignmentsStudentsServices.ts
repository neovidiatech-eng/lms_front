import api from "../../../lib/axios"
import { AssignmentsResponse } from "../../../types/assignment"

export const getAssignments = async (): Promise<AssignmentsResponse> => {
    const response = await api.get<AssignmentsResponse>("/homework/studentExams")
    return response.data
}