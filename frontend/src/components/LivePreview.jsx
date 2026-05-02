import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import { motion, AnimatePresence } from 'framer-motion';

const LivePreview = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="sticky top-24 bg-gray-200 p-4 rounded-xl overflow-auto max-h-[calc(100vh-8rem)] shadow-inner">
      <div className="origin-top scale-[0.5] sm:scale-[0.6] xl:scale-[0.85] transition-all duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {renderTemplate()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LivePreview;
