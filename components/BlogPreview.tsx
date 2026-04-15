import Image from "next/image";

const posts = [
  {
    title: "5 Morning Skincare Habits That Changed My Skin",
    category: "Routines",
    readTime: "4 min read",
    image: "/images/blog/morning-habits.jpg",
  },
  {
    title: "How to Build a Skincare Routine That Actually Works",
    category: "Getting Started",
    readTime: "6 min read",
    image: "/images/blog/build-routine.jpg",
  },
  {
    title: "Why Your Moisturizer Might Not Be Enough",
    category: "Hydration",
    readTime: "5 min read",
    image: "/images/blog/moisturizer.jpg",
  },
  {
    title: "Skincare Myths I Wish I'd Stopped Believing Sooner",
    category: "Myth Busting",
    readTime: "5 min read",
    image: "/images/blog/skincare-myths.jpg",
  },
];

export function BlogPreview() {
  return (
    <section id="tips" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mb-14 flex flex-col gap-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          Skincare tips
        </p>
        <h2 className="text-3xl text-charcoal sm:text-4xl md:text-5xl">
          From the beauty journal
        </h2>
        <p className="mx-auto max-w-xl text-warm-gray">
          Honest advice, gentle reminders, and the little habits that make a
          real difference.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <a
            key={post.title}
            href="#tips"
            className="group flex flex-col overflow-hidden rounded-2xl border border-blush-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-wider text-warm-gray-light">
                <span>{post.category}</span>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="flex-1 text-lg leading-snug text-charcoal group-hover:text-blush-500">
                {post.title}
              </h3>
              <span className="mt-4 text-sm font-medium text-blush-500">
                Coming soon →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
