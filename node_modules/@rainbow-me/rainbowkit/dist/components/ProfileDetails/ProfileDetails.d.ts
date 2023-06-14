/// <reference types="react" />
import { useAccount, useBalance, useEnsAvatar, useEnsName } from 'wagmi';
interface ProfileDetailsProps {
    address: ReturnType<typeof useAccount>['address'];
    balanceData: ReturnType<typeof useBalance>['data'];
    ensAvatar: ReturnType<typeof useEnsAvatar>['data'];
    ensName: ReturnType<typeof useEnsName>['data'];
    onClose: () => void;
    onDisconnect: () => void;
}
export declare function ProfileDetails({ address, balanceData, ensAvatar, ensName, onClose, onDisconnect, }: ProfileDetailsProps): JSX.Element | null;
export {};
