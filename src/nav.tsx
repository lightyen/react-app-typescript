import React from "react"
import { NavConfig } from "~/layout/navigation"
import { BootstrapColors } from "./components/bootstrap/types"

// material-ui icons
import DashboardIcon from "@material-ui/icons/Dashboard"

const TestProgress: React.FC = () => {
    return (
        <div style={{ width: "100%", padding: "0.5rem 1rem", display: "grid", gridTemplateColumns: "1fr" }}>
            <div className="text-uppercase mb-1">Test</div>
            <div className="progress" style={{ height: 5 }}>
                <div className="progress-bar bg-info w-25"></div>
            </div>
            <small className="text-muted"> Progress 3/8</small>
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
    { type: "normal", path: "/hello", name: <span>hello</span>, icon: { fa: "fas fa-th-large" } },
    {
        type: "normal",
        path: "/highlight",
        name: <span>代碼高亮</span>,
        icon: { material: DashboardIcon },
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
    { type: "custom", name: <TestLabel color="info" label="Label 1" /> },
    { type: "custom", name: <TestLabel color="danger" label="Label 2" /> },
    { type: "custom", name: <TestProgress /> },
    { type: "custom", name: <div style={{ height: 100 }}></div> },
]
