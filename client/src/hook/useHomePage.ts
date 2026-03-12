import { useGetFormsQuery } from "../api/baseApi";

export function useHomePage() {
    const { data, isLoading, isError } = useGetFormsQuery();

    const forms = data?.forms ?? [];

    console.log("data:", data);
    console.log("forms:", forms);

    return { forms, isLoading, isError };
}
