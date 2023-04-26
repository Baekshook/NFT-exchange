export default function NftCard({ tokenId, metadata }) {
  return (
    <div>
      <img src={metadata.image} alt={metadata.name} />
    </div>
  );
}
