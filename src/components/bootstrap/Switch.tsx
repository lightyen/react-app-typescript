import React, { useState } from "react"
import classnames from "classnames"
import { v4 } from "uuid"
import { BootstrapColors } from "./types"

interface SwitchProps {
    color?: BootstrapColors
    label?: boolean
    outline?: boolean | "alt"
    size?: "" | "lg" | "sm"
    checked?: boolean
    disabled?: boolean
    name?: string
    value?: string
    onChange?: (e: boolean) => void
    variant?: "3d" | "pill"
    style?: React.CSSProperties
    className?: string
    dataOn?: string
    dataOff?: string
}

const defaultProps: SwitchProps = {
    color: "secondary",
    size: "",
    dataOn: "On",
    dataOff: "Off",
    checked: false,
    disabled: false,
    name: "",
    value: "",
}

interface SwitchState {
    checked: boolean
    name: string
}

const Switch: React.FC<SwitchProps> = ({
    name,
    onChange,
    style,
    className,
    disabled,
    color,
    label,
    outline,
    size,
    value,
    dataOn,
    dataOff,
    variant,
    ...rest
}) => {
    const [id] = useState(() => v4())
    const [checked, setChecked] = useState(() => rest.checked)

    function handleChange(e: React.MouseEvent<HTMLInputElement>) {
        console.log("handle")
        setChecked(checked)
    }

    // const classes = classnames(
    //     className,
    //     "switch",
    //     label ? "switch-label" : false,
    //     size ? `switch-${size}` : false,
    //     variant ? `switch-${variant}` : false,
    //     `switch${outline ? "-outline" : ""}-${color}${outline === "alt" ? "-alt" : ""}`,
    //     "form-check-label",
    // )

    // const inputClasses = classnames("switch-input", "form-check-input")

    // const sliderClasses = classnames("switch-slider")

    return (
        <div className="custom-control custom-switch" style={style}>
            <input
                name={name}
                value={value}
                type="checkbox"
                id={id}
                className={classnames("custom-control-input")}
                onChange={e => {
                    const { checked } = e.target
                    if (onChange) {
                        onChange(checked)
                    }
                    setChecked(checked)
                }}
                checked={checked}
                disabled={disabled}
            />
            <label className="custom-control-label" htmlFor={id}>
                Toggle this switch element
            </label>
        </div>
    )
}

Switch.defaultProps = defaultProps

export default Switch
