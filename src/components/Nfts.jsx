export default function Nfts({ page }) {
  const pageComponent = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button key={i}>
          {i + 1} <span>페이지</span>
        </button>
      );
    }

    return pageArray;
  };

  return (
    <div>
      <div>{pageComponent()}</div>
    </div>
  );
}
