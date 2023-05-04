export default function MintCount({ counter, setCounter }) {
  const plusCounter = () => {
    if (counter >= 5) {
      alert("최대 민팅 개수는 5개까지 입니다.");
    } else {
      setCounter(counter + 1);
    }
  };

  const minusCounter = () => {
    if (counter < 1) {
      alert("민팅 개수는 음수가 될 수 없습니다.");
    } else {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="mt-3 flex flex-row">
      <div className="mb-7 mr-2 flex flex-row border h-10 w-24 rounded-lg border-gray-400 relative">
        <button
          onClick={minusCounter}
          className="font-semibold border-r bg-black hover:bg-gray-700 text-white border-gray-400 h-full w-20 flex rounded-l focus:outline-none cursor-pointer"
        >
          <span className="m-auto">-</span>
        </button>
        <input
          type="hidden"
          className="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center"
          readonly
          name="custom-input-number"
        />
        <div className="bg-gray-300 w-24 text-xs md:text-base flex items-center justify-center cursor-default">
          <span className="font-bye text-lg text-black">{counter}</span>
        </div>
        <button
          onClick={plusCounter}
          className="font-semibold border-l bg-black hover:bg-gray-700 text-white border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer"
        >
          <span className="m-auto">+</span>
        </button>
      </div>
    </div>
  );
}
