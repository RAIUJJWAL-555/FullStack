import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';


const List = ({token}) => {
   const[list,setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log('API data:', response.data); // Double-check the shape here
      // Defensive: will set whatever is available
      if (Array.isArray(response.data.products)) {
        setList(response.data.products);
      } else if (Array.isArray(response.data.product)) {
        setList(response.data.product);
      } else if (Array.isArray(response.data)) {
        setList(response.data);
      } else {
        setList([]); 
        toast.error("No product array in response.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) =>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})
      console.log("Remove API Response:", response.data);
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
        }else{
          toast.error(response.data.message)
        }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  
   useEffect(()=>{
    fetchList();
  },[])

  return (
    <>
      <p className='mb-2'>ALL Products List</p>
      <div className="flex flex-col gap-2">
  {/* Table Header */}
  <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 font-bold border-b">
    <p>Image</p>
    <p>Name</p>
    <p>Category</p>
    <p>Price</p>
    <p className="text-center">Action</p>
  </div>

  {/* Product List */}
  {list.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border-b"
    >
      <img
        src={item.image[0]}   // ✅ confirm your API sends `image: ["url"]`
        alt={item.name}
        className="w-12 h-12 object-cover rounded"
      />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>{currency}{item.price}</p>
      <button onClick={()=>removeProduct(item._id)} className="text-red-500 text-center">X</button>
    </div>
  ))}

</div>

    </>
  );
}

export default List;
