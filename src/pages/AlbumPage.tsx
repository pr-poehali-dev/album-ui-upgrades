
import { useState, useRef, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Photo, Album } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft, Plus, Trash2, Camera } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import EmptyState from "@/components/ui/empty-state";

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useLocalStorage<Album[]>("albums", []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const album = albums.find(a => a.id === id);

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Альбом не найден</h1>
          <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos: Photo[] = [];
      
      Array.from(e.target.files).forEach(file => {
        const url = URL.createObjectURL(file);
        newPhotos.push({
          id: uuidv4(),
          url,
          title: file.name
        });
      });

      setAlbums(prevAlbums => 
        prevAlbums.map(a => 
          a.id === id ? { ...a, photos: [...a.photos, ...newPhotos] } : a
        )
      );
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    setAlbums(prevAlbums => 
      prevAlbums.map(a => 
        a.id === id ? { ...a, photos: a.photos.filter(p => p.id !== photoId) } : a
      )
    );
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад
          </Button>
          <h1 className="text-3xl font-bold">{album.title}</h1>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <p className="text-gray-500">
              {album.photos.length} {album.photos.length === 1 ? 'фотография' : 
                album.photos.length > 1 && album.photos.length < 5 ? 'фотографии' : 'фотографий'}
            </p>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button onClick={handleAddPhoto} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Добавить фото
            </Button>
          </div>
        </div>

        {album.photos.length === 0 ? (
          <EmptyState 
            title="В этом альбоме пока нет фотографий"
            description="Нажмите кнопку «Добавить фото», чтобы загрузить фотографии"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {album.photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
