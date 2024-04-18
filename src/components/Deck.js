import steeringWheelImage from "../assets/images/steering-wheel.png";

function Deck({
  isLowerDeck = true,
  handleSeatOnClick,
  selectedDateData,
  selectedSeat,
  date,
}) {
  const lowerDeckSeats = Array.from(
    { length: 18 },
    (_, i) => i + 1 + (isLowerDeck ? 0 : 20)
  );
  return (
    <div className="flex justify-center items-center  h-50 w-50">
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto mt-8">
        <h2 data-testid="deck" className="text-xl font-bold mb-2">
          {isLowerDeck ? "Lower Deck" : "Upper Deck"}
        </h2>
        <div className="mr-4 flex bg-white shadow-lg mt-8">
          <div className="w-3 sm:h-[27rem] md:h-[16rem] lg:h-[16rem] bg-secondary-500 mr-4"></div>
          {isLowerDeck ? (
            <>
              <div>
                <img
                  src={steeringWheelImage}
                  alt="Steering Wheel"
                  className="max-w-10 mr-4 mt-[1rem]"
                />
              </div>
              <div className="w-0.5 sm:h-[27rem]  md:h-[16rem]  lg:h-[16rem] py-4 bg-secondary-300 mr-4"></div>
            </>
          ) : null}
          <div className="flex flex-col sm: w-[15rem] md:w-[30rem] lg:w-[41rem]">
            <div className="flex flex-wrap mt-[1rem] ml-[1rem]">
              {lowerDeckSeats.slice(0, 12).map((seat, index) => (
                <div
                  key={seat}
                  className={`w-14 lg:w-24 sm:w-[4rem] h-12 flex items-center justify-center mr-[.4rem] mb-3 border border-secondary-300 cursor-pointer ${
                    selectedDateData?.[seat]
                      ? "bg-gray text-graytext !cursor-not-allowed"
                      : date && selectedSeat === seat
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleSeatOnClick(seat)}
                >
                  <div className="w-100 flex justify-center items-center">
                    <p className="w-50 text-secondary">{seat}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-[1rem] ml-[1rem]">
              {lowerDeckSeats.slice(12).map((seat, index) => (
                <div
                  key={seat}
                  className={`w-14 lg:w-24 sm:w-[4rem] h-12 flex items-center justify-center mr-[.4rem] mb-3 border border-secondary-300 cursor-pointer ${
                    selectedDateData?.[seat]
                      ? "bg-gray text-graytext !cursor-not-allowed"
                      : date && selectedSeat === seat
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleSeatOnClick(seat)}
                >
                  <div className="w-100 flex justify-center items-center">
                    {seat}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`ml-[1rem] mt-[4rem] mr-[2rem] w-12 h-24 flex items-center justify-center left-0 border border-secondary-300 cursor-pointer`}
          >
            <div className="flex flex-col items-center">
              <p
                className={`h-12 w-12 border border-secondary-300 flex items-center justify-center ${
                  selectedDateData?.[isLowerDeck ? 19 : 39]
                    ? "bg-gray text-graytext !cursor-not-allowed"
                    : date && selectedSeat === (isLowerDeck ? 19 : 39)
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-primary hover:text-white"
                }`}
                onClick={() => handleSeatOnClick(isLowerDeck ? 19 : 39)}
              >
                {isLowerDeck ? 19 : 39}
              </p>
              <p
                className={`h-12 w-12 border border-secondary-300 flex items-center justify-center ${
                  selectedDateData?.[isLowerDeck ? 20 : 40]
                    ? "bg-gray text-graytext !cursor-not-allowed"
                    : date && selectedSeat === (isLowerDeck ? 20 : 40)
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-primary hover:text-white"
                }`}
                onClick={() => handleSeatOnClick(isLowerDeck ? 20 : 40)}
              >
                {isLowerDeck ? 20 : 40}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
