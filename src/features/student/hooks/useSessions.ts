import { useQuery } from "@tanstack/react-query"
import { getStudentSessions } from "../services/SessionsServices"

export const useStudentSessions = (studentId: string) => {
    return useQuery({
        queryKey: ["student-sessions", studentId],
        queryFn: () => getStudentSessions(studentId),
        enabled: !!studentId
    })
}