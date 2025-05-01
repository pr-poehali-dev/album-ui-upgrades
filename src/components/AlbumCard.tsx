
import { useState, useRef } from "react";
import { Trash, Camera } from "lucide-react";
import { Album } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface AlbumCardProps {
  album: Album;
  onDelete: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
}

const AlbumCard = ({ album, onDelete, onTitleChange }: AlbumCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(album.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleTitleChange = () => {
    setIsEditing(false);
    if (title.trim() !== album.title) {
      onTitleChange(album.id, title.trim() || "new");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleChange();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTitle(album.title);
    }
  };

  const handleClick = () => {
    if (!isEditing) {
      navigate(`/album/${album.id}`);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
      <div onClick={handleClick}>
        <CardContent className="p-0 relative">
          {album.photos.length > 0 ? (
            <img
              src={album.photos[0].url}
              alt={album.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <Camera className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(album.id);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </CardContent>
      </div>
      <CardFooter className="p-3">
        {isEditing ? (
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleChange}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div
            className="text-sm font-medium truncate w-full"
            onDoubleClick={handleDoubleClick}
          >
            {album.title}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
