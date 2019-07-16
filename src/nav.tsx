import React from "react"
import LocaleMessage from "~/components/LocaleMessage"
import { BootstrapColors } from "~/components/bootstrap/types"

/** Custom Icon */
export interface Icon {
    fa?: string
    hover?: string
    render?: React.FunctionComponent<unknown>
}

/** Bootstrap badge */
export interface Badge {
    name: React.ReactNode
    color?: BootstrapColors
    pill?: boolean
    render?: React.FunctionComponent<{ className: string }>
}

export interface NavConfigNormalItemProps {
    type: "normal"
    name: React.ReactNode
    path?: string
    exact?: boolean
    icon?: Icon
    badge?: Badge
    custom?: boolean
}

export interface NavConfigDropdownItemProps {
    type: "dropdown"
    name: React.ReactNode
    items: NavConfigItem[]
    icon?: Icon
    badge?: Badge
}

export interface NavConfigDividerItemProps {
    type: "divider"
}

export interface NavConfigTitleItemProps {
    type: "title"
    name: React.ReactNode
}

export type NavConfigItem =
    | NavConfigNormalItemProps
    | NavConfigDropdownItemProps
    | NavConfigDividerItemProps
    | NavConfigTitleItemProps

type NavConfig = NavConfigItem | NavConfigItem[]

const TestProgress: React.FC = () => {
    return (
        <div style={{ width: "100%", padding: "0.5rem 1rem", display: "grid", gridTemplateColumns: "1fr" }}>
            <div className="text-uppercase mb-1">Test</div>
            <div className="progress" style={{ height: 5 }}>
                <div className="progress-bar bg-info w-25"></div>
            </div>
            <small className="text-muted">1265 Processes. 2/8 Cores.</small>
        </div>
    )
}

const TestLabel: React.FC<{ color: BootstrapColors; label: string }> = ({ color, label }) => {
    return (
        <div className="justify-content-start" style={{ padding: "0.1rem 1rem" }}>
            <span className={"text-" + color}>
                <i className="mr-1 fas fa-circle" />
            </span>
            {label}
        </div>
    )
}

/** 全域管理 navigation */
export const navConfig: NavConfig = [
    { type: "title", name: <span>Test</span> },
    { type: "normal", path: "/hello", name: <LocaleMessage id="hello" />, icon: { fa: "fas fa-th-large" } },
    {
        type: "normal",
        path: "/highlight",
        name: <span>代碼高亮</span>,
        icon: { fa: "fas fa-hashtag" },
        badge: {
            name: "HOT",
        },
    },
    {
        type: "dropdown",
        name: <span>Dropdown</span>,
        icon: { fa: "fas fa-th-large" },
        badge: {
            name: "HOT",
            color: "danger",
        },
        items: [
            {
                type: "normal",
                name: "hello1",
                badge: {
                    name: "COLD",
                    color: "primary",
                    pill: true,
                },
            },
            { type: "normal", name: "hello2" },
            { type: "normal", name: "hello3" },
            { type: "normal", name: "hello4" },
            { type: "normal", name: "hello5" },
            { type: "normal", name: "hello6" },
            { type: "normal", name: "hello7" },
            { type: "normal", name: "hello8" },
            { type: "normal", name: "hello9" },
            { type: "normal", name: "hello10" },
            { type: "divider" },
        ],
    },
    { type: "normal", path: "/popper", name: <span>Popper</span> },
    { type: "normal", path: "/threejs", name: <span>three.js</span> },
    { type: "normal", name: <TestLabel color="info" label="Label 1" />, custom: true },
    { type: "normal", name: <TestLabel color="danger" label="Label 2" />, custom: true },
    { type: "normal", name: <TestProgress />, custom: true },
]
