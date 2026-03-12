import { Link } from "react-router-dom";
import FormCard from "../components/forms/FormCard";
import { useHomePage } from "../hook/useHomePage";
import styles from "./HomePage.module.css";

export default function HomePage() {
    const { forms, isLoading, isError } = useHomePage();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong. Please try again.</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Forms Lite</h1>
                <Link to="/forms/new">+ Create New Form</Link>
            </div>

            {forms.length === 0 ? (
                <p className={styles.empty}>No forms yet. Create your first form!</p>
            ) : (
                <div className={styles.list}>
                    {forms.map((form) => (
                        <FormCard key={form.id} form={form} />
                    ))}
                </div>
            )}
        </div>
    );
}