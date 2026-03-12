import { Link } from "react-router-dom";
import type { GetFormsQuery } from "../../api/generated/types";
import styles from "./FormCard.module.css";

type Form = GetFormsQuery["forms"][number];

interface FormCardProps {
    form: Form;
}

export default function FormCard({ form }: FormCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <h3>{form.title}</h3>
                {form.description && <p>{form.description}</p>}
            </div>
            <div className={styles.actions}>
                <Link to={`/forms/${form.id}/fill`}>Fill Form</Link>
                <Link to={`/forms/${form.id}/responses`}>Responses</Link>
            </div>
        </div>
    );
}