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
        <div className="card-list">
            <table className="coin-list">
                <thead className="coin-header">
                    <tr>
                        <th className="coin-heading">Name</th>
                        <th className="coin-heading">Price</th>
                        <th className="coin-heading">30d %</th>
                        <th className="coin-heading"></th>
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
                                <td>
                                    <p className='col-list-left'>${Math.trunc(coin.quote.USD.price, 2)}</p>
                                </td>
                                <td className={Math.round(coin.quote.USD.percent_change_24h, 2).toString().indexOf('-') >= 0 ? 'red' : 'green'}>
                                    <p>{Math.round(coin.quote.USD.percent_change_24h, 2).toString()}%</p>
                                </td>
                                <td>
                                    <button className='button-add'>Add</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>Cargando...</p>
                    )}
                </tbody>
            </table>
        </div>

    )
}
