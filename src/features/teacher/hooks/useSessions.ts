import { useQuery } from "@tanstack/react-query"
import { getTeacherSchedule } from "../services/ScehdualesServices"

export const useTeacherSchedule = (search: string) => {
    return useQuery({
        queryKey: ["teacher-schedule", search],
        queryFn: () => getTeacherSchedule(search),
    })
}