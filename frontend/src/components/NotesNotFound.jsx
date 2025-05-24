import { Link } from "react-router";
import { NotebookIcon } from "lucide-react";

const NotesNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-10 px-4 py-20 text-center max-w-xl mx-auto rounded-lg">
      <div className="bg-primary/10 rounded-full p-6 mb-6">
        <NotebookIcon className="w-10 h-10 text-primary" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-semibold text-base-content mb-2">
        No Notes Found
      </h1>
      <p className="text-base text-center max-w-prose mx-auto text-base-content/70 mb-6">
        Ready to organize your thoughts? <br /> Start by creating your first
        note and watch your ideas grow.
      </p>
      <nav>
        <Link
          to="/create"
          className="btn btn-primary px-6 py-2 text-base rounded-xl"
        >
          Create Your First Note
        </Link>
      </nav>
    </section>
  );
};

export default NotesNotFound;
