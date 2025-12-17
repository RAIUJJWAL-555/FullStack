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
      <div className="card w-full shadow-xl border-t-4 border-primary">
        <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Product List</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your store's products.</p>
           </div>
           {list.length > 0 && (
             <span className="bg-indigo-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-100">
               {list.length} Items
             </span>
           )}
        </div>

      <div className="flex flex-col gap-2">
  {/* Table Header */}
  <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-4 bg-indigo-50/50 rounded-xl font-bold text-gray-600 text-sm uppercase tracking-wide">
    <p>Image</p>
    <p>Name</p>
    <p>Category</p>
    <p>Price</p>
    <p className="text-center">Action</p>
  </div>

  {/* Product List */}
  <div className="flex flex-col gap-3 mt-2">
  {list.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-4 px-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 bg-white hover:border-indigo-100 group"
    >
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-14 h-14 object-cover rounded-lg border border-gray-200 group-hover:scale-105 transition-transform duration-300"
      />
      <p className="font-semibold text-gray-800 truncate pr-4 group-hover:text-primary transition-colors">{item.name}</p>
      <p className="text-gray-600 bg-gray-50 inline-block w-fit px-3 py-1 rounded-full text-xs font-medium">{item.category}</p>
      <p className="text-primary font-bold text-base">{currency}{item.price}</p>
      <button 
        onClick={()=>removeProduct(item._id)} 
        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-300 text-center mx-auto block hover:rotate-90"
        title="Remove Product"
      >
        <p className="text-xl leading-none">×</p> 
      </button>
    </div>
  ))}
  </div>

</div>
</div>

    </>
  );
}

export default List;
