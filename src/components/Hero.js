import { useState, useEffect } from "react";

const Hero = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // load more button state
  const [loadMore, setLoadMore] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      coin.current_price.toString().includes(search.toLowerCase()) ||
      coin.market_cap.toString().includes(search.toLowerCase()) ||
      coin.total_volume.toString().includes(search.toLowerCase()) ||
      coin.price_change_percentage_24h.toString().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">

      <div className="coin-search">
        <form>
          <input
            type="text"
            placeholder="Search a currency"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {loading ? (
        <h1 className="coin-text">Loading...</h1>
      ) : (
        <div className="coin-container">
          <div className="coin-row">
            <div className="coin">
              <h1 className="coin-text">Name</h1>
            </div>
            <div className="coin-data">
              <h1 className="coin-text">Price</h1>
            </div>
            <div className="coin-data">
              <h1 className="coin-text">Volume</h1>
            </div>
            <div className="coin-data">
              <h1 className="coin-text">Price Change</h1>
            </div>
            <div className="coin-data">
              <h1 className="coin-text">Market Cap</h1>
            </div>
          </div>
          {filteredCoins.slice(0, loadMore).map((coin) => {
            return (
              <div className="coin-row" key={coin.id}>
                <div className="coin">
                  <img src={coin.image} alt="crypto" />
                  <h1 className="coin-text">{coin.name}</h1>
                  <p className="coin-symbol">{coin.symbol}</p>
                </div>
                <div className="coin-data">
                  <p className="coin-text">${coin.current_price}</p>
                </div>
                <div className="coin-data">
                  <p className="coin-text">
                    ${coin.total_volume.toLocaleString()}
                  </p>
                </div>
                <div className="coin-data">
                  {coin.price_change_percentage_24h < 0 ? (
                    <p className="coin-percent red">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="coin-percent green">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}
                </div>
                <div className="coin-data">
                  <p className="coin-text">
                    ${coin.market_cap.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
            <div className="show-button">
              
          {loadMore < filteredCoins.length && (
            <button
            className="load-more"
            onClick={() => setLoadMore(loadMore + 10)}
            >
              Load More
            </button>
          )}
            {
              loadMore > 10 && (
                <button
                className="show-less"
                onClick={() => setLoadMore(loadMore - 10)}
                >
                  Show Less
                </button>
              )
              }
              {
                loadMore < filteredCoins.length && (
                  <button
                    className="show-all"
                    onClick={() => setLoadMore(filteredCoins.length)}
                  >
                    Show All
                  </button>
                )
              }
            </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
