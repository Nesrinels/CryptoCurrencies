import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoItem from './CryptoItem';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
     try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    );
    setCryptos(response.data);
  } catch (error) {
    console.log(error);
  }
};
fetchData();
}, []);

return (
  <div>
  <input
  type="text"
  placeholder="Search..."
  onChange={(e) => {
      setSearch(e.target.value);
  }}
/>

<ul>
{cryptos.filter((crypto) => {
 return crypto.name.toLowerCase().includes(search.toLowerCase());})
.map((crypto, key) => {
     return (<CryptoItem
                  key={crypto.id}
                  name={crypto.name}
                 symbol={crypto.symbol}
                 price={crypto.current_price}
                 image={crypto.image}
                 priceChange={crypto.price_change_percentage_24h}
             /> );
     })}
</ul>
</div> 
);
};
export default CryptoList;