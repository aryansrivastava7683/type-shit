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

export default function Home() {
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
    <div
      className="min-h-screen relative flex flex-col items-center bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/img/bg.gif')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70 "></div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* HEADER */}
        <header className="w-full h-[80px] py-3 bg-gradient-to-r from-black via-zinc-900 to-black border-b border-white/10 shadow-lg ">
          <div className="flex items-center justify-between  w-full px-4">

            {/* MENU */}
            <Image
              src="/menu.svg"
              alt="menu"
              width={40}
              height={40}
              className="bg-white cursor-pointer rounded-xl"
              onClick={() => setOpen(true)}
            />

            {/* TITLE */}
            <h1 className="text-center md:text-4xl text-2xl font-extrabold tracking-wider text-white p-2 ">
              Night's Shit Post
            </h1>

            <div />
          </div>
        </header>

        {/* OVERLAY */}
        {open && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed top-0 left-0 h-full w-[80%] md:w-[300px] overflow-scroll
            bg-zinc-950 border-r border-white/10 shadow-2xl z-50
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Posts</h2>


            <ul className="space-y-4">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="cursor-pointer hover:text-purple-400 transition"
                  onClick={() => scrollToPost(p.id)}
                >
                  {p.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* POSTS */}
        <main className="w-full flex flex-col items-center px-4 py-6 gap-8 overflow-y-auto h-[calc(100vh-80px)]">

          {posts.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-2 border-b border-white/20">
                {item.title}
              </h2>

              <p className="text-xs text-white/50 mb-3">
                {new Date(item.created_at).toLocaleString()}
              </p>

              <div className="space-y-1 text-white/90 leading-relaxed">
                {item.post.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-white/60">No posts yet...</p>
          )}

        </main>
        <footer className="w-full h-[40px] flex items-center justify-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Night's Shit Post. All rights reserved.

        </footer>
        <a href="https://aryan-srivastava-ptf.vercel.app/" className="hover:text-purple-400 transition p-2 text-xs">
          Night's Site
        </a>
      </div>
    </div>
  );
}