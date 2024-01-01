import React, { useEffect, useState } from 'react'

const URI = 'http://localhost:3001/lastest'
const IMG_URI = 'https://s2.coinmarketcap.com/static/img/coins/64x64/'


export const ListAllCoins = () => {

    const [coins, setCoins] = useState([])


    useEffect(() => {
        fetch(URI)
            .then(results => results.json())
            .then(data => {
                setCoins(data.data.slice(0, 15))
                //console.log('funciona',data)
            }).catch(error => console.log('error', error))
    }, [])

    function getIcon(id) {
        return IMG_URI + id + ".png";
    }


    return (
        <table className="coin-list">
            <thead className="coin-header">
                <tr>
                    <th className="coin-heading">Name</th>
                    <th className="coin-heading">Price</th>
                    <th className="coin-heading">24h %</th>
                    <th className="coin-heading">30d %</th>
                </tr>
            </thead>
            <tbody>
                {coins.length ? (
                    coins.map((coin, index) => (
                        <tr className="coin-item" key={index}>
                            <td>
                                <div className='coin-name'>
                                    <img src={getIcon(coin.id)} className='icon-coin'></img><span>{coin.name}&nbsp;</span><span className='symbol'> {coin.symbol}</span>
                                </div>
                            </td>
                            <td>${Math.trunc(coin.quote.USD.price, 2)}</td>
                            <td className={Math.round(coin.quote.USD.percent_change_24h, 2).toString().indexOf('-') >= 0 ? 'red' : 'green'}>
                                {Math.round(coin.quote.USD.percent_change_24h, 2).toString()}%
                            </td>
                            <td className={Math.round(coin.quote.USD.percent_change_30d, 2).toString().indexOf('-') >= 0 ? 'red' : 'green'}>
                                {Math.round(coin.quote.USD.percent_change_30d, 2).toString()}%
                            </td>
                        </tr>
                    ))
                ) : (
                    <p>Cargando...</p>
                )}
            </tbody>
        </table>

    )
}
