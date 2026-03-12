import { useParams, Link } from "react-router-dom";
import { useFormFiller } from "../hook/useFormFiller";
import QuestionRenderer from "../components/filler/QuestionRenderer";
import styles from "./FormFillerPage.module.css";

export default function FormFillerPage() {
    const { id } = useParams<{ id: string }>();
    const {
        form,
        questions,
        answers,
        isLoading,
        isError,
        isSubmitting,
        isSubmitted,
        fieldErrors,
        handleTextChange,
        handleCheckboxChange,
        handleSingleChoiceChange,
        handleSubmit,
    } = useFormFiller(id ?? "");

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong. Please try again.</div>;
    if (!form) return <div>Form not found.</div>;

    if (isSubmitted) {
        return (
            <div className={styles.page}>
                <div className={styles.success}>
                    <h2>✓ Form Submitted</h2>
                    <p>Your response has been recorded.</p>
                    <br />
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>{form.title}</h1>
                {form.description && <p>{form.description}</p>}
            </div>

            <div className={styles.questions}>
                {questions.map((question) => (
                    <QuestionRenderer
                        key={question.id}
                        question={question}
                        answers={answers}
                        error={fieldErrors[question.id]}
                        onTextChange={handleTextChange}
                        onCheckboxChange={handleCheckboxChange}
                        onSingleChoiceChange={handleSingleChoiceChange}
                    />
                ))}
            </div>

            <div className={styles.submit}>
                <button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}