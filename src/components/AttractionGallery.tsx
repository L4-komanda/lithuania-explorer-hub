
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Attraction } from '@/lib/types';

// This would come from your real data in a production app
const mockGalleryImages = [
  "https://images.unsplash.com/photo-1518803194621-27188ba362c9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541410813355-b6b17fb6e7b8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596395819057-e37d48e362b4?q=80&w=1000&auto=format&fit=crop"
];

interface AttractionGalleryProps {
  attraction: Attraction;
  isOpen: boolean;
  onClose: () => void;
}

const AttractionGallery: React.FC<AttractionGalleryProps> = ({ attraction, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryImages = [attraction.image, ...mockGalleryImages];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-10 rounded-full bg-black/20 hover:bg-black/30 text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl">{attraction.name}</DialogTitle>
              <DialogDescription>{attraction.description}</DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="relative mt-4">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex aspect-video items-center justify-center p-2">
                      <img
                        src={image}
                        alt={`${attraction.name} - Nuotrauka ${index + 1}`}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
            
            <div className="flex justify-center gap-2 mt-4 pb-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? 'bg-primary w-4' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttractionGallery;
