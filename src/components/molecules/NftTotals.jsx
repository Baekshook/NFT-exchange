import {useState, useEffect} from 'react'
import { contract } from '../../web3.config';

export default function NftTotals() {
    const [mintedNft, setMintedNft] = useState(0);

    const getMintedNft = async () => {
      try {
        if (!contract) return;

        const response = await contract.methods.totalSupply().call();

        setMintedNft(response);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getMintedNft();
    }, []);

  return (
    <div className='flex flex-col justify-center items-center text-black font-bold mt-2'>
      <div>잔여 개수</div>
      <div>{mintedNft} / 1000</div>
    </div>
  )
}
