import { useQuery } from "@tanstack/react-query"
import { getStudentSessions } from "../services/SessionsServices"

export const useStudentSessions = (search: string) => {
    return useQuery({
        queryKey: ["student-sessions", search],
        queryFn: () => getStudentSessions(search),
    })
}