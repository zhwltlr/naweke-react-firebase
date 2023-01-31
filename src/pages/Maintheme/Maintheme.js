import React, { useEffect, useState } from 'react';
import ProductList from '../components/productlist';
import './Maintheme.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { SORT_DATA } from './Sortdata';
import Filter from '../Main/Filter/Filter';

function Maintheme() {
  const [productdata, setProductData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortValue, setSortValue] = useState({});
  const sort = searchParams.get('sort');

  const imgName = searchParams.get('subCategory');

  useEffect(() => {
    fetch(`http://10.58.52.162:3000/products?${searchParams.toString()}`)
      .then(response => response.json())
      .then(result => setProductData(result.data));
  }, [searchParams]);

  return (
    <div className="main">
      <div className="sortWrap" style={{ backgroundColor: 'white' }}>
        {SORT_DATA.map(({ id, text, url }) => {
          return (
            <div key={id}>
              <input
                id={url}
                name="sort"
                type="radio"
                value={sortValue}
                onChange={e => {
                  setSortValue(prev => ({
                    ...prev,
                    [e.target.name]: e.target.name,
                  }));
                }}
                className={`sort ${text}`}
                key={id}
                onClick={() => {
                  searchParams.delete('sort');
                  searchParams.append('sort', url);
                  setSearchParams(searchParams);
                }}
              />
              <label htmlFor={url} className="label">
                <span>{text}</span>
              </label>
            </div>
          );
        })}
      </div>
      <Filter setData={setProductData} productdata={productdata} />
      <ProductList data={productdata} />
    </div>
  );
}

export default Maintheme;
