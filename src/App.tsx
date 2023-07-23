import React, { lazy, startTransition, useState } from 'react';
import SQLCodeBlock from './components/SqlEditor';
import Layout from './components/Layout';
import Button from './components/Button';
import 'react-data-grid/lib/styles.css';
// import DataGrid from 'react-data-grid';

const initList = [
  {
    name: 'Get Orders',
    query: `SELECT * 
FROM orders 
WHERE AGE > 18;
`,
    loadFile: './json/orders.json'
  },
  {
    name: 'Some Details',
    query: `SELECT * 
FROM some_details 
WHERE AGE > 18;
`,
    loadFile: './json/products.json'
  },

  {
    name: 'Custom Query',
    query: ` type your test query...`,
    loadFile: './json/customers.json'
  },
]

const DataGrid = lazy(() => import('react-data-grid'))

function App() {
  const [tabs, setTabs] = useState(initList)
  const [selectedTab, setSelectedTab] = useState(0)
  const [data, setData] = useState<null | {
    columns: any[]
    rows: any[]
  }>(null)

  async function getData() {
    console.log(tabs[selectedTab].loadFile);
    
    let data: any = await fetchData(tabs[selectedTab].loadFile)
    
    if (data?.length > 0) {
      startTransition(() => {
        setData({
          columns: data?.[0] ? Object.keys(data?.[0]).map(res => ({
            key: res,
            name: res
          })): [],
          rows: data
        })
      }) 
    }
  }

  async function fetchData(filePath: string) {
    try {
      // Dynamically import the JSON file using dynamic import
      let response: any;

      if (filePath.includes('customers')) {
        response = await import('./json/customers.json')
      }
      else if (filePath.includes('orders')) {
        response = await import('./json/orders.json')
      }
      else {
        response = await import('./json/products.json')
      }

      return response.default
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  };
  
  return (
    <Layout>
      <div className="w-full flex flex-col">
        {/* <h1 className="text-2xl font-bold mb-4">SQL Code Example:</h1> */}
        {/* <div className='flex flex-col flex-1'> */}
          <div className='flex p-6'>
            <label htmlFor="saved">
              <div className='mr-2.5'>saved quries</div>
              <select id='saved' className='border border-primary px-2.5' value={selectedTab} onChange={(e) => {
                setSelectedTab(parseInt(e.target.value))
                setData(null)
              }}>
                {
                  React.Children.toArray(
                    tabs.map((res, index) => <option value={index} >{res.name}</option>)
                  )
                }
              </select>
            </label>
          </div>
          <SQLCodeBlock sqlCode={tabs[selectedTab].query}>
            <Button onClick={getData}>Run Query</Button>
          </SQLCodeBlock>
          <div className='flex flex-1 bg-white w-full h-full border-t-2 border-t-line-grey min-h-[400px] justify-center items-center p-6'>
            {data? <DataGrid className='w-full' {...data} /> :'Run query to get data...'}
          </div>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default App;
