import { useFormBuilder } from "../hook/useFormBuilder";
import QuestionEditor from "../components/builder/QuestionEditor";
import styles from "./FormBuilderPage.module.css";

export default function FormBuilderPage() {
    const {
        form,
        isLoading,
        isError,
        validationErrors,
        setTitle,
        setDescription,
        addQuestion,
        deleteQuestion,
        changeQuestion,
        addOption,
        removeOption,
        needsOptions,
        handleSubmit,
        changeOption,
    } = useFormBuilder();

    const handleOptionChange = (questionId: string, optionId: string, value: string) => {
        changeOption(questionId, optionId, value);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Create New Form</h1>
                <input
                    type="text"
                    placeholder="Form Title"
                    value={form.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {validationErrors.title && (
                    <p className="error-text">{validationErrors.title}</p>
                )}
                <textarea
                    placeholder="Form Description (optional)"
                    value={form.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {isError && <p className="error-text">Something went wrong. Please try again.</p>}

            <div className={styles.questions}>
                {form.questions.map((question) => (
                    <QuestionEditor
                        key={question.id}
                        question={question}
                        onDelete={deleteQuestion}
                        onChange={changeQuestion}
                        onAddOption={addOption}
                        onRemoveOption={removeOption}
                        onChangeOption={handleOptionChange}
                        needsOptions={needsOptions}
                        errors={validationErrors.questions?.[question.id]}
                    />
                ))}
            </div>

            <div className={styles.actions}>
                <button onClick={addQuestion}>+ Add Question</button>
                <button onClick={handleSubmit} disabled={isLoading || !form.title.trim()}>
                    {isLoading ? "Saving..." : "Save Form"}
                </button>
            </div>
        </div>
    );
}