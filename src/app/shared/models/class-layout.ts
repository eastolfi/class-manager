export interface ClassLayout {
    id: number;
    name: string;
    classItems?: ClassItem[];
    classElements?: ClassItem[];
    students?: ClassItem[];
}

export interface ClassName {
    id: number;
    name: string;
}

export interface ClassItem {
    id: number;
    label: string;
    type: string;
    color?: string;
    orientation?: string;
    editing?: boolean;
    lastKnownPosition?: ScreenPosition,
    position?: ScreenPosition
}

export interface ItemPosition {
    id: number;
    position: ScreenPosition;
}

export interface ScreenPosition {
    x: number;
    y: number;
}
