import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Getting Product Failed!');
    }
  };

  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/product/remove`, {
      id: productId,
    });

    await fetchList();

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Removing product failed, check you connection');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h4>All Product</h4>
      <div className="list-table">
        <div className="list-table-format title">
          <b>No.</b>
          <b>Image</b>
          <b>Name</b>
          <b>Categoty</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>({index + 1})</p>
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₦{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className="cursor">
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
