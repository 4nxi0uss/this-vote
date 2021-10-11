import React, { useEffect, useState } from 'react';

import type { dataTypes } from './Types/Types';

import './App.scss';
import Header from './Components/Header/Header';

function App() {

  const [data, setData] = useState<dataTypes>()

  // console.time(`ok`)
  useEffect(() => { fetch('http://localhost:3022/get').then(res => res.json()).then(data => setData(data)).catch(err => console.log(err)) }, [setData])
  // console.timeEnd('ok')

  console.log(data)

  const tableData = () => (
    data?.rows.map((row, i) => <tr key={row.Id}><td >{row.Id}</td><td>{row.bus_number}</td><td>{row.departure_time}</td><td>{row.destination}</td></tr>)
  );



  return (
    <div className="App">
      <Header />
      <table>
        <thead>
          <tr>
            <th>
              {data?.fields[0].name}
            </th>
            <th>
              {data?.fields[1].name}
            </th>
            <th>
              {data?.fields[2].name}
            </th>
            <th>
              {data?.fields[3].name}
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
