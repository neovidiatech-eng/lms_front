import { useQuery } from "@tanstack/react-query"
import { getStudentAgenda } from "../services/AgandeServices"

export const useAgenda = (startDate: string, endDate: string) => {
    return useQuery({
        queryKey: ["agenda", startDate, endDate],
        queryFn: () => getStudentAgenda(startDate, endDate),
    })
}