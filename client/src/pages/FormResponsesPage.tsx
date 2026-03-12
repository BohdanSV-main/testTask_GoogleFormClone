import { useParams, Link } from "react-router-dom";
import { useFormResponses } from "../hook/useFormResponses";
import ResponseCard from "../components/responses/ResponseCard";
import styles from "./FormResponsesPage.module.css";

export default function FormResponsesPage() {
    const { id } = useParams<{ id: string }>();
    const { form, responses, isLoading, isError, getQuestionTitle } =
        useFormResponses(id ?? "");

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong. Please try again.</div>;
    if (!form) return <div>Form not found.</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Link to="/">← Back to Home</Link>
                <h1>{form.title}</h1>
                <p>{responses.length} response{responses.length !== 1 ? "s" : ""}</p>
            </div>

            {responses.length === 0 ? (
                <p className={styles.empty}>No responses yet.</p>
            ) : (
                <div className={styles.list}>
                    {responses.map((response) => (
                        <ResponseCard
                            key={response.id}
                            response={response}
                            getQuestionTitle={getQuestionTitle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}