import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/productscard';
import { useApi } from '../../hooks/useApi';

const ProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'All Products', endpoint: 'products' },
        { id: 'chairs', name: 'Chairs', endpoint: 'products/category/Chairs' },
        { id: 'tables', name: 'Tables', endpoint: 'products/category/Tables' },
        { id: 'sofas', name: 'Sofas', endpoint: 'products/category/Sofas' },
        { id: 'kitchen', name: 'Kitchen', endpoint: 'products/category/Kitchen' },
        { id: 'beds', name: 'Beds', endpoint: 'products/category/Beds' },
        { id: 'storage', name: 'Storage', endpoint: 'products/category/Storage' },
        { id: 'office', name: 'Office', endpoint: 'products/category/Office' },
        { id: 'discounts', name: 'Discounts', endpoint: 'products/discount/true' },
    ];
    const selectedCategory = categories.find(cat => cat.id === activeCategory);
    const { callApi, loading } = useApi(selectedCategory.endpoint, 'GET');

    


    useEffect(() => {
        const load = async () => {
            const response = await callApi();
            if (response && response.data) {   
                setProducts(response.data)
            }
        }
        load();
    }, [activeCategory]);

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="p-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Furniture Collection
                    </h2>
                    <p className="text-lg text-gray-600  max-w-2xl mx-auto">
                        Discover our carefully curated selection of modern, minimalist furniture 
                        designed to transform your living space.
                    </p>
                </div>
                

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setActiveCategory(category.id);
                            }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeCategory === category.id
                                    ? 'bg-amber-500 text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse"
                            >
                                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {products?.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </motion.div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            No products found in this category.
                        </p>
                    </div>
                )}

                {/* View All Button
                {!loading && products.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            View All Products
                        </button>
                    </div>
                )} */}
            </div>
        </section>
    );
};

export default ProductsSection;