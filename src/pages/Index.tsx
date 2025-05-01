
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Album } from "@/lib/types";
import AlbumCard from "@/components/AlbumCard";
import EmptyState from "@/components/ui/empty-state";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from "@/hooks/useLocalStorage";

const Index = () => {
  const [albums, setAlbums] = useLocalStorage<Album[]>("albums", []);

  const createNewAlbum = () => {
    const newAlbum: Album = {
      id: uuidv4(),
      title: "new",
      photos: []
    };
    
    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
  };

  const deleteAlbum = (id: string) => {
    setAlbums((prevAlbums) => prevAlbums.filter(album => album.id !== id));
  };

  const updateAlbumTitle = (id: string, newTitle: string) => {
    setAlbums((prevAlbums) => 
      prevAlbums.map(album => 
        album.id === id ? { ...album, title: newTitle } : album
      )
    );
  };

  const deleteAllAlbums = () => {
    setAlbums([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Фотоальбомы</h1>
          <div className="flex gap-3">
            <Button onClick={createNewAlbum} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Добавить альбом
            </Button>
            {albums.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={deleteAllAlbums}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Удалить все
              </Button>
            )}
          </div>
        </div>

        {albums.length === 0 ? (
          <div className="mb-8">
            <EmptyState 
              title="У вас пока нет альбомов" 
              description="Нажмите кнопку «Добавить альбом», чтобы создать свой первый альбом"
              icon={<Plus className="w-12 h-12 text-gray-400" />}
            />
            <div className="mt-4 flex justify-center">
              <Button onClick={createNewAlbum} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Добавить альбом
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                onDelete={deleteAlbum} 
                onTitleChange={updateAlbumTitle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
