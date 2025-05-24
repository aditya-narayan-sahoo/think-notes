import api from "../lib/axios";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const result = await api.get(`/notes/${id}`);
        setNote(result.data);
      } catch (error) {
        console.error(`Error fetching note: ${error.message}`);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async (e) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted !!");
      navigate("/");
    } catch (error) {
      console.error(`Error in handleDelete function: ${error.message}`);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = async (e) => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please enter a title and content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error(`Error in handleUpdate function: ${error.message}`);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-base-200 flex flex-col items-center justify-center text-center px-4">
        <LoaderIcon className="animate-spin text-primary size-10 mb-4" />
        <p className="text-base-content/70 text-lg">
          Loading your note
          <span className="loading loading-dots loading-md ml-2" />
        </p>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content hover:underline"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-error text-sm"
            aria-label="Delete this note"
          >
            <Trash2Icon className="w-5 h-5" />
            Delete
          </button>
        </header>

        <section className="bg-base-100 rounded-2xl shadow-lg p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-6"
          >
            <section>
              <label
                htmlFor="title"
                className="block text-base font-semibold mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter a title for your note"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
              />
            </section>

            <section>
              <label
                htmlFor="content"
                className="block text-base font-semibold mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                className="textarea textarea-bordered w-full h-40 resize-none"
                placeholder="Write your note here..."
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
              />
            </section>

            <section className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary px-6"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </section>
          </form>
        </section>
      </div>
    </main>
  );
};

export default NoteDetailPage;
