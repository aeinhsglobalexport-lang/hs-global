
import { motion } from 'framer-motion';
interface ArtCardProps {
    title: string;
    description: string;
    image: string;
    onClick: () => void;
}
const ArtCard: React.FC<ArtCardProps> = ({ title, description, image, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg"
            onClick={onClick}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </motion.div>
    );
};


export default ArtCard;