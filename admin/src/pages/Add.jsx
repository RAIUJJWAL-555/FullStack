import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Animation Library

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
  
  // Loading State for Button
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start Loading

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller);
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

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop Loading
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full gap-8 p-4 sm:p-8 bg-white shadow-lg rounded-xl border border-gray-100"
    >
      
      {/* --- Header Section --- */}
      <motion.div variants={itemVariants} className="flex items-center justify-between border-b pb-4">
         <div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new product.</p>
         </div>
      </motion.div>

      {/* --- Upload Images --- */}
      <motion.div variants={itemVariants}>
        <p className="mb-3 font-semibold text-gray-700">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {[setImage1, setImage2, setImage3, setImage4].map((setImg, idx) => {
             const currentImage = [image1, image2, image3, image4][idx];
             return (
                <label key={idx} htmlFor={`image${idx + 1}`} className="cursor-pointer group">
                  <motion.div 
                    whileHover={{ scale: 1.05, borderColor: "#6366f1" }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-24 h-24 border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden relative transition-colors ${currentImage ? 'border-indigo-500' : 'border-gray-300'}`}
                  >
                      <img
                        className={`w-full h-full object-contain ${!currentImage ? 'p-6 opacity-50' : ''}`}
                        src={!currentImage ? assets.upload_area : URL.createObjectURL(currentImage)}
                        alt="Upload"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         {!currentImage && <span className="text-xs font-bold text-gray-600">Upload</span>}
                      </div>
                  </motion.div>
                  <input
                    onChange={(e) => setImg(e.target.files[0])}
                    type="file"
                    id={`image${idx + 1}`}
                    hidden
                  />
                </label>
             )
          })}
        </div>
      </motion.div>

      {/* --- Product Name --- */}
      <motion.div variants={itemVariants} className="w-full">
        <p className="mb-2 font-semibold text-gray-700">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-lg px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          type="text"
          placeholder="Type product name"
          required
        />
      </motion.div>

      {/* --- Product Description --- */}
      <motion.div variants={itemVariants} className="w-full">
        <p className="mb-2 font-semibold text-gray-700">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-lg px-4 py-3 h-32 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
          placeholder="Write content here..."
          required
        />
      </motion.div>

      {/* --- Category, Subcategory, Price --- */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="w-full sm:w-1/3">
          <p className="mb-2 font-semibold text-gray-700">Category</p>
          <div className="relative">
             <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black outline-none bg-white appearance-none cursor-pointer"
             >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
             </select>
             {/* Custom Arrow */}
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
             </div>
          </div>
        </div>

        <div className="w-full sm:w-1/3">
          <p className="mb-2 font-semibold text-gray-700">Sub Category</p>
          <div className="relative">
            <select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black outline-none bg-white appearance-none cursor-pointer"
            >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
             </div>
          </div>
        </div>

        <div className="w-full sm:w-1/3">
          <p className="mb-2 font-semibold text-gray-700">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </motion.div>

      {/* --- Sizes --- */}
      <motion.div variants={itemVariants}>
        <p className="mb-3 font-semibold text-gray-700">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <motion.div
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`${
                sizes.includes(size) ? "bg-black text-white border-black" : "bg-gray-100 text-gray-600 border-gray-200"
              } px-4 py-2 cursor-pointer border rounded-md transition-colors font-medium text-center min-w-[3rem] shadow-sm`}
            >
              {size}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- Bestseller Checkbox --- */}
      <motion.div variants={itemVariants} className="flex gap-3 items-center mt-2 p-3 bg-gray-50 rounded-lg w-fit border border-gray-200 cursor-pointer" onClick={() => setBestseller(!bestseller)}>
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${bestseller ? 'bg-black border-black' : 'border-gray-400'}`}>
            {bestseller && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <label className="cursor-pointer text-gray-700 font-medium select-none">
          Add to Bestseller
        </label>
      </motion.div>

      {/* --- Submit Button --- */}
      <motion.button 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="submit" 
        disabled={loading}
        className="w-full sm:w-auto bg-black text-white mt-4 py-3 px-14 rounded-lg font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
         {loading ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
         ) : (
             "ADD PRODUCT"
         )}
      </motion.button>

    </motion.form>
  );
};

export default Add;