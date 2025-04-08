import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  image,
  date,
  readTime,
  category
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
          {category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{readTime}</span>
          <span className="mx-2">•</span>
          <Tag className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-primary hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-accent font-medium hover:text-primary transition-colors"
        >
          Read More →
        </motion.button>
      </div>
    </motion.article>
  );
};

export default BlogCard;