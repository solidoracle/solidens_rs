import { useState } from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';
import { useApprove } from '~~/hooks/other/useApprove';
import { LEVEREDVAULT_ABI, LEVEREDVAULT_CONTRACT_ADDRESS } from '~~/utils/constants';
import { parseEther } from '~~/utils/parseEther';

export const useDeposit = () => {
  const { address } = useAccount();
  const { approve, allowance } = useApprove();
  const [depositValue, setDepositValue] = useState(0);
  const [sendEthHash, setSendEthHash] = useState('');
  const [sendWethHash, setSendWethHash] = useState('');

  const { config: depositWethConfig } = usePrepareContractWrite({
    address: LEVEREDVAULT_CONTRACT_ADDRESS,
    abi: LEVEREDVAULT_ABI,
    functionName: 'deposit',
    args: [parseEther(depositValue), address],
  });

  const { write: depositWeth } = useContractWrite({
    ...depositWethConfig,
    onSuccess(data) {
      setSendWethHash(data.hash);
    },
  });

  // usePrepareSendTransaction is used to prepare the config that is passed to useSendTransaction (as recommended by Wagmi docs)
  const { config } = usePrepareSendTransaction({
    request: { to: LEVEREDVAULT_CONTRACT_ADDRESS, value: parseEther(depositValue) },
  });

  // useSendTransaction calls the fallback function inside the contract ('receive'). This hook is only used for sending ETH.
  const { sendTransaction: sendEth } = useSendTransaction({
    ...config,
    onSuccess: (data: any) => setSendEthHash(data.hash),
  });

  // useWaitForTransaction takes the hash of a processing transaction and provides updates on where the transaction is up to.
  const { isLoading: isEthDepositProcessing } = useWaitForTransaction({
    enabled: !!sendEthHash,
    hash: sendEthHash as `0x${string}`,
    // TODO: onSuccess: Show success toast message
    onSuccess: (data: any) => console.log('completed', data),
    // TODO: onError: Show error toast message
  });

  const { isLoading: isWethDepositProcessing } = useWaitForTransaction({
    enabled: !!sendWethHash,
    hash: sendWethHash as `0x${string}`,
    // TODO: onSuccess: Show success toast message
    onSuccess: (data: any) => console.log('completed', data),
    // TODO: onError: Show error toast message
  });

  const handleDeposit = ({ currencyCode }: { currencyCode: any }) => {
    // if 'WETH' we need to make sure the user has approved the value of WETH before allowing them to deposit.
    if (currencyCode === 'WMATIC') {
      if (allowance.lt(parseEther(depositValue))) {
        approve(depositValue);
      }

      depositWeth?.();
      return;
    }

    sendEth?.();
    return;
  };

  return {
    handleDeposit,
    depositValue,
    setDepositValue,
    isDepositProcessing: isEthDepositProcessing || isWethDepositProcessing,
  };
};
