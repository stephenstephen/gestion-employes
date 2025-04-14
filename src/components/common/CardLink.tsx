import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface CardLinkProps {
  to: string;
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'red' | 'gray';
}

const textColors: Record<string, string> = {
  blue: 'text-blue-800',
  green: 'text-green-800',
  red: 'text-red-800',
  gray: 'text-gray-800',
};

export const CardLink: React.FC<CardLinkProps> = ({
  to,
  title,
  description,
  color = 'blue',
}) => {
  return (
    <Link to={to}>
      <Card className="hover:shadow-lg transition-all cursor-pointer">
        <CardContent className="p-6 text-center">
          <h2 className={`text-lg font-semibold ${textColors[color]}`}>{title}</h2>
          <p className="text-gray-500 mt-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
