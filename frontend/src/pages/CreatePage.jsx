import api from "../lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.error(`Error creating note: ${error.message}`);
      if (error.response?.status === 429) {
        toast.error("Slow down, You're creating notes too fast!", {
          duration: 3000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-base-200" data-theme="forest">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <header className="mb-6">
            <nav>
              <Link
                to="/"
                className="btn btn-ghost gap-2 hover:bg-base-content/30 hover:scale-105"
              >
                <ArrowLeftIcon className="size-5" />
                <span>Back to Notes</span>
              </Link>
            </nav>
          </header>

          <article className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title text-2xl font-semibold mb-6">
                Create New Note
              </h1>

              <form onSubmit={handleSubmit}>
                <section className="mb-5">
                  <label htmlFor="title" className="label">
                    <span className="label-text text-lg font-medium">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </section>

                <section className="mb-6">
                  <label htmlFor="content" className="label">
                    <span className="label-text text-lg font-medium">
                      Content
                    </span>
                  </label>
                  <textarea
                    id="content"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-40 p-3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </section>

                <footer className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </footer>
              </form>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default CreatePage;
