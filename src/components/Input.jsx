/* eslint-disable react/prop-types */
import styles from "./Input.module.css";

export default function Input({
    id,
    labelText,
    value,
    type,
    className,
    onChange,
}) {
    return (
        <div className={styles.inputItem}>
            <label htmlFor={id}>{labelText}</label>
            <input
                value={value}
                min={0}
                type={type}
                id={id}
                className={`${styles.input} ${className}`}
                onChange={onChange}
            />
        </div>
    );
}
