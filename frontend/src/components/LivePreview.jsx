import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';

const LivePreview = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="sticky top-8 bg-gray-200 p-4 rounded-xl overflow-auto max-h-[calc(100vh-4rem)]">
      <div className="origin-top scale-[0.6] sm:scale-[0.7] lg:scale-[0.8] xl:scale-100 transition-transform duration-300">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default LivePreview;
