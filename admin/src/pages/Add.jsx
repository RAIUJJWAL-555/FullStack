import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      console.log("API Response:", response.data); // 👈 Debugging line

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full gap-6 card max-w-4xl shadow-xl border-t-4 border-primary"
    >
      <div className="border-b border-gray-200 pb-4 mb-2 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Add New Product</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new product.</p>
         </div>
         <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <i className="text-xl">+</i>
         </div>
      </div>

      {/* Upload Images */}
      <div>
        <p className="mb-2 font-semibold text-gray-700">Upload Image</p>
        <div className="flex gap-4">
          {[setImage1, setImage2, setImage3, setImage4].map((setImg, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className="cursor-pointer group">
              <div className="w-24 h-24 border-2 border-dashed border-indigo-200 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-indigo-50 group-hover:border-primary transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-md">
                  <img
                    className={`w-full h-full object-contain ${![image1, image2, image3, image4][idx] ? 'p-6 opacity-40 group-hover:opacity-60' : ''}`}
                    src={
                      ![image1, image2, image3, image4][idx]
                        ? assets.upload_area
                        : URL.createObjectURL([image1, image2, image3, image4][idx])
                    }
                    alt=""
                  />
                  {/* Overlay for hover effect */}
                   {![image1, image2, image3, image4][idx] && (
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-xs text-primary font-bold">Upload</span>
                       </div>
                   )}
              </div>
              <input
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                id={`image${idx + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-semibold text-gray-700">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="input-field max-w-lg shadow-sm"
          type="text"
          placeholder="Type product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 font-semibold text-gray-700">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="input-field max-w-lg h-32 resize-none shadow-sm"
          placeholder="Write content here..."
          required
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="w-full sm:w-1/3">
          <p className="mb-2 font-semibold text-gray-700">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="input-field bg-white shadow-sm"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <p className="mb-2 font-semibold text-gray-700">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="input-field bg-white shadow-sm"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <p className="mb-2 font-semibold text-gray-700">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="input-field shadow-sm"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 font-semibold text-gray-700">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-gradient-to-br from-primary to-secondary text-white border-transparent shadow-md transform scale-105" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                } px-4 py-2 cursor-pointer border rounded-md transition-all duration-200 font-medium text-center min-w-[3rem]`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2 items-center">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
        />
        <label className="cursor-pointer text-gray-700 font-medium" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className="w-full sm:w-auto btn-primary mt-6 !py-3 !px-10 self-start shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
