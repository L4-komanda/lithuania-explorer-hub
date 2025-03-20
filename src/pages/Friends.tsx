
import React, { useEffect, useState } from 'react';
import { friends } from '@/lib/data';
import { Users, UserPlus, Search } from 'lucide-react';

const FriendsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Animation on component mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0 });
  }, []);
  
  // Filter friends based on search term
  const filteredFriends = friends.filter(
    friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Hero section */}
        <section className="mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Draugai
            </h1>
            <p className="text-muted-foreground">
              Pridėkite naujus draugus, bendraukite ir kartu atraskite Lietuvą.
            </p>
          </div>
        </section>
        
        {/* Search and actions */}
        <section className="mb-8 animate-slide-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Ieškoti draugų..."
                className="w-full pl-10 py-2 border border-input bg-white rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <UserPlus className="h-5 w-5" />
              <span>Pridėti draugą</span>
            </button>
          </div>
        </section>
        
        {/* Friends list */}
        <section className="mb-8">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 bg-secondary/50 border-b border-border flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <h2 className="font-semibold">Mano draugai ({friends.length})</h2>
            </div>
            
            <div className="divide-y divide-border">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend, index) => (
                  <div 
                    key={friend.id} 
                    className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors animate-slide-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name} 
                        className="h-12 w-12 rounded-full"
                      />
                      <div 
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{friend.status}</p>
                    </div>
                    <button className="text-sm text-primary hover:text-primary/80">
                      Rodyti profilį
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>Nerasta draugų pagal paiešką "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Friend suggestions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Siūlomi draugai</h2>
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              Šiuo metu nėra naujų siūlomų draugų.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FriendsPage;
