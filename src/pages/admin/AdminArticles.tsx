import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash, Eye, Calendar, Clock } from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
  author: string;
  status: "published" | "draft";
}

const AdminArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock articles data
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "Free Fire vs BGMI: Which Mobile Battle Royale Reigns Supreme?",
      description:
        "A detailed comparison of the two most popular mobile battle royale games in India.",
      content: "Full article content here...",
      image:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      date: "May 15, 2023",
      category: "Comparison",
      readTime: "5 min read",
      views: 1245,
      author: "Gaming Guru",
      status: "published",
    },
    {
      id: "2",
      title: "Pro Player Spotlight: The Rise of Total Gaming in Free Fire",
      description: "An exclusive interview with Ajju Bhai from Total Gaming.",
      content: "Full article content here...",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: "June 3, 2023",
      category: "Player Profiles",
      readTime: "8 min read",
      views: 2389,
      author: "eSports Analyst",
      status: "published",
    },
    {
      id: "3",
      title: "Top 5 Smartphone Settings for Competitive BGMI Players",
      description: "Optimize your mobile device for peak BGMI performance.",
      content: "Full article content here...",
      image:
        "https://images.unsplash.com/photo-1558742569-fe6d39d05837?w=800&q=80",
      date: "April 22, 2023",
      category: "Tips & Tricks",
      readTime: "6 min read",
      views: 3156,
      author: "Tech Expert",
      status: "published",
    },
    {
      id: "4",
      title: "The Evolution of Free Fire: From Launch to Global Phenomenon",
      description:
        "Tracing the journey of Free Fire from its humble beginnings.",
      content: "Full article content here...",
      image:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
      date: "March 10, 2023",
      category: "Game History",
      readTime: "7 min read",
      views: 1876,
      author: "Gaming Historian",
      status: "published",
    },
    {
      id: "5",
      title: "Upcoming Features in BGMI 2.0 Update",
      description: "A sneak peek at the exciting new features coming to BGMI.",
      content: "Full article content here...",
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
      date: "June 20, 2023",
      category: "News",
      readTime: "4 min read",
      views: 0,
      author: "Mobile Gaming News",
      status: "draft",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    category: "News",
    readTime: "5 min read",
    author: "",
    status: "draft",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateArticle = () => {
    // In a real app, this would make an API call to create the article
    const newArticle: Article = {
      id: `${articles.length + 1}`,
      title: formData.title,
      description: formData.description,
      content: formData.content,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: formData.category,
      readTime: formData.readTime,
      views: 0,
      author: formData.author || "Admin",
      status: formData.status as "published" | "draft",
    };

    setArticles([...articles, newArticle]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      image: "",
      category: "News",
      readTime: "5 min read",
      author: "",
      status: "draft",
    });
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-500/20 text-green-500">Published</Badge>
        );
      case "draft":
        return <Badge className="bg-amber-500/20 text-amber-500">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Article Management">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Create Article
        </Button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Author</TableHead>
              <TableHead className="text-gray-400">Views</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id} className="hover:bg-gray-800/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-10 w-16 object-cover rounded"
                    />
                    <div className="truncate max-w-[300px]">
                      {article.title}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>{article.views.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(article.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create Article Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Article</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to create a new article.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter article title"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a brief description"
                className="bg-gray-800 border-gray-700 text-white resize-none h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Tips & Tricks">Tips & Tricks</SelectItem>
                    <SelectItem value="Comparison">Comparison</SelectItem>
                    <SelectItem value="Player Profiles">
                      Player Profiles
                    </SelectItem>
                    <SelectItem value="Game History">Game History</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Industry">Industry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Select
                  value={formData.readTime}
                  onValueChange={(value) =>
                    handleSelectChange("readTime", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select read time" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="3 min read">3 min read</SelectItem>
                    <SelectItem value="5 min read">5 min read</SelectItem>
                    <SelectItem value="8 min read">8 min read</SelectItem>
                    <SelectItem value="10 min read">10 min read</SelectItem>
                    <SelectItem value="15 min read">15 min read</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Article Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your article content here..."
                className="bg-gray-800 border-gray-700 text-white resize-none h-40"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateArticle}
              className="bg-primary hover:bg-primary/90"
              disabled={
                !formData.title || !formData.description || !formData.content
              }
            >
              {formData.status === "published"
                ? "Publish Article"
                : "Save Draft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminArticles;
