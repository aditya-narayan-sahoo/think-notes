import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import api from "../lib/axios";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimited from "../components/RateLimited";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await api.get("/notes");
        console.log(result.data);
        setNotes(result.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.error(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}
      <section className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-lg text-primary py-10">
            Loading notes
            <span className="loading loading-dots loading-md ml-2"></span>
          </div>
        )}
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default HomePage;
