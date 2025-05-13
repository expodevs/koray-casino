import {useQuery} from "@tanstack/react-query";

export interface useRequestDataInterface {
    url: string;
    queryKey?: string | string[];
}

export function useRequestData<T>({url, queryKey = 'entity'}: useRequestDataInterface) {
    return useQuery<T>({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        queryFn: async () => {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error loading data');
            return res.json();
        },
    });
}