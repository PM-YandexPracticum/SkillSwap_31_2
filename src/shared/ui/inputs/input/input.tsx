import React, { memo, useState } from "react";
import { TInputInterface } from "./type";

import styles from '../inputs.module.scss'
import clsx from "clsx";

export const Input: React.FC<TInputInterface> = memo(
    ({ lable, isValid, placeholder, onChange, value, errorText }) => {
        return (
            <div className={styles.container}>
                <label className={styles.lable} htmlFor={`${lable}Input`}>{lable}</label>
                <input
                    id={`${lable}Input`}
                    type='text'
                    className={clsx([styles.input, !isValid && styles.errorBorder])}
                    placeholder={placeholder}
                    onChange={onChange}
                >{value}</input>
                <small className={clsx([styles.small, !isValid && styles.errorText])}>{!isValid && errorText}</small>
            </div>
        )
    }
);