import { ZapIcon } from "lucide-react";

/**
 * Renders a visually appealing and informative message
 * when a user hits a rate limit.
 *
 * @returns {JSX.Element} The rate limited UI component.
 */
const RateLimited = () => {
  return (
    <main className="flex justify-center bg-base-100 p-4">
      <div className="w-full max-w-md bg-base-200 border border-base-300 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center bg-primary/10 p-5 rounded-full mb-6 border-2 border-primary/20">
            <ZapIcon className="size-12 text-primary animate-pulse" />
          </div>

          <h3 className="text-2xl font-extrabold text-base-content mb-3">
            Whoa there!
          </h3>
          <p className="text-lg text-base-content/80 mb-6">
            You've hit our request limit for now. Please take a short break.
          </p>
          <p className="text-sm text-base-content/60">
            This helps us keep things running smoothly for everyone. You can try
            again in a few moments.
          </p>
        </div>
        <div className="bg-primary/10 px-8 py-4 text-xs text-primary/70 text-center font-medium">
          Patience is a virtue (especially with APIs!)
        </div>
      </div>
    </main>
  );
};

export default RateLimited;
