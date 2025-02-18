import { useState } from 'react'

export default function App() {
  const rawData = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ]
  const [data, setData] = useState(rawData)
  const handleSearch = params => {
    const { keyword = '', stockOnly = false } = params
    const nameFiltered = rawData.filter(x => {
      const name = x.name.toLowerCase()
      return name.includes(keyword)
    })
    const stockFiltered = nameFiltered.filter(x => {
      if (stockOnly) {
        return x.stocked
      }
      return true
    })
    
    setData(stockFiltered)
  }
  return (
    <div>
      <Searcher handleSearch={ handleSearch } />
      <Table data={data} />
    </div>
  )
}

function Searcher ({ handleSearch }) {
  const [params, setParams] = useState({
    keyword: '',
    stockOnly: false
  })
  const handleInputChange = e => {
    const newParams = {
      ...params,
      keyword: e.target.value
    }
    setParams(newParams)
    handleSearch(newParams)
  }
  const handleCheckboxChange = e => {
    const newParams = {
      ...params,
      stockOnly: e.target.checked
    }
    setParams(newParams)
    handleSearch(newParams)
  }
  return (
    <div>
      <input type="text" onChange={ handleInputChange } />
      <div className="filter-box">
        <div>
          <input type="checkbox" onChange={ handleCheckboxChange } />
          <span>Only show products in stock</span>
        </div>
      </div>
    </div>
  )
}

function Table({ data }) {
  const types = [...new Set(data.map(x => x.category))]
  const typeMap = new Map()
  for (const type of types) {
    const typedList = data.filter(x => x.category === type)
    typeMap.set(type, typedList)
  }
  console.log(typeMap);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            [...typeMap.entries()].map(([key, val]) => {
              return (
                <>
                  <tr key={key}>
                    <td style={{ fontWeight: 'bold' }}>{key}</td>
                  </tr>
                  {
                    val.map(x => {
                      return (
                        <tr key={x.name}>
                          <td style={{ color: x.stocked ? '#000' : 'red' }}>{x.name}</td>
                          <td>{x.price}</td>
                        </tr>
                      )
                    })
                  }
                </>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}