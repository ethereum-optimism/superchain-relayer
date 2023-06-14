/// <reference types="react" />
import { useAccount } from 'wagmi';
interface TxListProps {
    address: ReturnType<typeof useAccount>['address'];
}
export declare function TxList({ address }: TxListProps): JSX.Element;
export {};
