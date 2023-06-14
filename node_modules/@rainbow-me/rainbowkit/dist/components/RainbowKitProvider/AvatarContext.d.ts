import React from 'react';
export type AvatarComponentProps = {
    address: string;
    ensImage?: string | null;
    size: number;
};
export type AvatarComponent = React.FunctionComponent<AvatarComponentProps>;
export declare const defaultAvatar: AvatarComponent;
export declare const AvatarContext: React.Context<AvatarComponent>;
