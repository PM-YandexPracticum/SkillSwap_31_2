import React, { memo, useState } from "react";
import { TInputInterface } from "./type";

import styles from '../inputs.module.scss'
import clsx from "clsx";

export const Input: React.FC<TInputInterface> = memo(
    ({ lable, extraClassName, placeholder, onChange, value, errorText }) => {
        return (
            <div className={styles.container}>
                <label className={styles.lable}>{lable}</label>
                <input
                    type='text'
                    className={clsx([styles.input, extraClassName])}
                    placeholder={placeholder}
                    onChange={onChange}
                >{value}</input>
                <small className={clsx([styles.small, extraClassName])}>{errorText}</small>
            </div>

        )
    }
);