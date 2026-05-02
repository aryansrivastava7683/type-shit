"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  post: string;
  created_at: string;
};

export default function Recs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      } else {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const scrollToPost = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Recommendations</h1>
        <p className="text-gray-300 mb-12 text-lg">Discover amazing movies and music</p>

        {/* Movie Recommendations Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">🎬 Movies</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Inception", year: 2010, description: "A mind-bending sci-fi thriller about dreams within dreams" },
              { title: "The Shawshank Redemption", year: 1994, description: "A timeless classic about hope and friendship" },
              { title: "Parasite", year: 2019, description: "A brilliant Korean thriller about class and deception" },
              { title: "Pulp Fiction", year: 1994, description: "Tarantino's iconic non-linear crime masterpiece" }
            ].map((movie) => (
              <div key={movie.title} className="group p-6 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-400/60 hover:scale-105 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 rounded-xl transition-all duration-300"></div>
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{movie.title}</h3>
                <p className="text-sm text-blue-300 mb-3 font-semibold relative z-10">{movie.year}</p>
                <p className="text-gray-200 text-sm relative z-10 leading-relaxed">{movie.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Song Recommendations Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">🎵 Songs</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Blinding Lights", artist: "The Weeknd", genre: "Synthwave Pop" },
              { title: "Bohemian Rhapsody", artist: "Queen", genre: "Progressive Rock" },
              { title: "Levitating", artist: "Dua Lipa", genre: "Disco Pop" },
              { title: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Classic Rock" }
            ].map((song) => (
              <div key={song.title} className="group p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/60 hover:scale-105 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 rounded-xl transition-all duration-300"></div>
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{song.title}</h3>
                <p className="text-sm text-purple-300 mb-3 font-semibold relative z-10">{song.artist}</p>
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/40 to-pink-500/40 border border-purple-400/50 rounded-full relative z-10">
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">{song.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}