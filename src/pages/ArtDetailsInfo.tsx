import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { ArrowLeft, Info, Calendar, MapPin } from "lucide-react";
// import galaryDetails from "../static/galaryDetail";
import artDetails from "../static/artDetail";
const ArtDetailsInfo = () => {
    const { productId } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    // In a real app, fetch details based on id
    // const details = {
    //   title: "Modern Kitchen Countertop",
    //   date: "January 2024",
    //   location: "New York, NY",
    //   description:
    //     "Luxurious black granite countertop installation featuring premium finish and expert craftsmanship.",
    //   images: [
    //     "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    //     "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
    //     "https://images.unsplash.csom/photo-1600607687939-ce8a6c25118c",
    //     "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    //   ],
    //   specifications: [
    //     { label: "Material", value: "Black Granite" },
    //     { label: "Finish", value: "Polished" },
    //     { label: "Area", value: "45 sq ft" },
    //     { label: "Installation Time", value: "3 days" },
    //   ],
    // };

    const details = artDetails.find((details) => details.id === parseInt(productId));
    if (!details) {
        return <div>Not found</div>;
    }
    // const details = galaryDetails.filter((detail) => detail.id === numId);
    const handleImageClick = (index: number) => {
        setSelectedImage(index);
    };

    return (
        <div className="pt-20 min-h-screen bg-secondary">
            <div className="container mx-auto px-4 py-12 ">
                <div className="gap-12 w-full ">
                    {/* Main Image and Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 "
                    >
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-4 rounded-lg shadow-lg "
                        >
                            <img
                                src={details.images[selectedImage]}
                                alt={`${details.title} - View ${selectedImage + 1}`}
                                className="w-full h-[500px] object-contain   rounded-lg"
                            />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {details.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`cursor-pointer relative rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-accent" : ""
                                        }`}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-24 object-cover"
                                    />
                                    {selectedImage === index && (
                                        <div className="absolute inset-0 bg-accent/20" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Project Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    ></motion.div>
                </div>
            </div>
        </div>
    );
};

export default ArtDetailsInfo;
