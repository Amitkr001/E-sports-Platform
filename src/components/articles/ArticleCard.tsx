import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarIcon, Clock, Eye } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
}

const ArticleCard = ({
  title = "The Rise of Mobile eSports: Competitive Gaming on the Go",
  description = "Explore how mobile gaming is transforming the eSports landscape with accessible competitive platforms for everyone.",
  image = "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
  date = "May 15, 2023",
  category = "Mobile Gaming",
  readTime = "5 min read",
  views = 1245,
}: ArticleCardProps) => {
  return (
    <Card className="w-full max-w-[400px] overflow-hidden bg-gray-900 border-gray-800 text-white hover:border-primary/50 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-primary/80 text-white border-none"
        >
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-2 text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-300 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <CalendarIcon size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{views.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto"
        >
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
