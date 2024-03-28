/* eslint-disable react/prop-types */
import styles from "./Input.module.css";

export default function Input({
    id,
    labelText,
    value,
    type,
    className,
    onChange,
    placeholder = "",
}) {
    return (
        <div className={styles.inputItem}>
            {labelText && <label htmlFor={id}>{labelText}</label>}
            <input
                placeholder={placeholder}
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
