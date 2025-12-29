import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Simulate API Call
        if(email) {
            setIsSubmitted(true);
            // Reset after 3 seconds (Optional)
            // setTimeout(() => { setIsSubmitted(false); setEmail('') }, 3000); 
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center py-10 bg-gradient-to-b from-white to-gray-50 rounded-xl my-10 border border-gray-100 shadow-sm mx-4 sm:mx-0'
        >
            {/* --- Heading Section --- */}
            <p className='text-3xl font-bold text-gray-800 tracking-tight'>
                Subscribe now & get <span className='text-red-500'>20% OFF</span>
            </p>
            <p className='text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed'>
                Join our community to get exclusive access to new arrivals, sales, and special offers directly to your inbox.
            </p>

            {/* --- Interactive Form / Success Message --- */}
            <div className='mt-6 h-20 flex items-center justify-center'>
                <AnimatePresence mode='wait'>
                    
                    {!isSubmitted ? (
                        // FORM STATE
                        <motion.form 
                            key="form"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={onSubmitHandler} 
                            className='w-full sm:w-1/2 flex items-center gap-3 mx-auto border pl-3 rounded-full overflow-hidden bg-white ring-1 ring-transparent focus-within:ring-black transition-all shadow-sm'
                        >
                            <input 
                                className='w-full sm:flex-1 outline-none py-3 px-2 text-gray-700' 
                                type="email" 
                                placeholder='Enter your email address' 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                            />
                            <motion.button 
                                whileHover={{ backgroundColor: "#333" }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-black text-white text-xs px-8 py-4 font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors' 
                                type='submit'
                            >
                                Subscribe
                            </motion.button>
                        </motion.form>
                    ) : (
                        // SUCCESS STATE
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-full border border-green-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span className="font-medium">Subscribed Successfully! Check your inbox.</span>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default NewsLetterBox;