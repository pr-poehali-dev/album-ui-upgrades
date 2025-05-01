
import { Camera } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState = ({
  title,
  description,
  icon = <Camera className="w-12 h-12 text-gray-400" />,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300 h-full min-h-[200px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default EmptyState;
