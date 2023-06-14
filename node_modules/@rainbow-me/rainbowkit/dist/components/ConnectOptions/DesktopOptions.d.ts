/// <reference types="react" />
export declare enum WalletStep {
    None = "NONE",
    LearnCompact = "LEARN_COMPACT",
    Get = "GET",
    Connect = "CONNECT",
    DownloadOptions = "DOWNLOAD_OPTIONS",
    Download = "DOWNLOAD",
    InstructionsMobile = "INSTRUCTIONS_MOBILE",
    InstructionsExtension = "INSTRUCTIONS_EXTENSION"
}
export declare function DesktopOptions({ onClose }: {
    onClose: () => void;
}): JSX.Element;
