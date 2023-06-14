import React from 'react';
type Props = {
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    as?: React.ElementType<any>;
    currentlySelected?: boolean;
    ready?: boolean;
    recent?: boolean;
    name: string;
    iconUrl: string | (() => Promise<string>);
    iconBackground?: string;
    testId?: string;
};
export declare const ModalSelection: {
    ({ as, currentlySelected, iconBackground, iconUrl, name, onClick, ready, recent, testId, ...urlProps }: Props): JSX.Element;
    displayName: string;
};
export {};
