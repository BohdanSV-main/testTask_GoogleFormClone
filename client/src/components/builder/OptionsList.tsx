import type { OptionDraft } from "../../types";
import styles from "./OptionsList.module.css";

interface OptionsListProps {
    options: OptionDraft[];
    onAdd: () => void;
    onRemove: (optionId: string) => void;
    onChange: (optionId: string, value: string) => void;
}

export default function OptionsList({ options, onAdd, onRemove, onChange }: OptionsListProps) {
    return (
        <div className={styles.list}>
            {options.map((option) => (
                <div key={option.id} className={styles.item}>
                    <input
                        type="text"
                        value={option.value}
                        placeholder="Option text"
                        onChange={(e) => onChange(option.id, e.target.value)}
                    />
                    <button onClick={() => onRemove(option.id)}>✕</button>
                </div>
            ))}
            <button className={styles.addBtn} onClick={onAdd}>+ Add Option</button>
        </div>
    );
}