import { useGetFormQuery, useGetResponsesQuery } from "../api/baseApi";

export function useFormResponses(formId: string) {
    const { data: formData, isLoading: isFormLoading } = useGetFormQuery({
        id: formId,
    });
    const {
        data: responsesData,
        isLoading: isResponsesLoading,
        isError,
    } = useGetResponsesQuery({ formId });

    const form = formData?.form;
    const responses = responsesData?.responses ?? [];

    const getQuestionTitle = (questionId: string): string => {
        return (
            form?.questions?.find((q) => q.id === questionId)?.title ??
            questionId
        );
    };

    return {
        form,
        responses,
        isLoading: isFormLoading || isResponsesLoading,
        isError,
        getQuestionTitle,
    };
}
