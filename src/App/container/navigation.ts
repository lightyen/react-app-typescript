import React from "react"
import { BootstrapColors } from "~/components/bootstrap/types"
import { SvgIconProps } from "@material-ui/core/SvgIcon"

/** Custom Icon */
export interface Icon {
    fa?: string
    material?: React.ComponentType<SvgIconProps>
    custom?: React.ComponentType
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

export interface NavConfigCustomItemProps {
    type: "custom"
    name: React.ReactNode
}

export type NavConfigItem =
    | NavConfigNormalItemProps
    | NavConfigDropdownItemProps
    | NavConfigDividerItemProps
    | NavConfigTitleItemProps
    | NavConfigCustomItemProps

export type NavConfig = NavConfigItem | NavConfigItem[]
