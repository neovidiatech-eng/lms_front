import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../services/PlansServices";

export const usePlans = () => {
    return useQuery({
        queryKey: ['plans'],
        queryFn: getPlans,
    })
}