export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 text-center text-wrap">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-pink-700 text-center">
          About Takusa Blog
        </h1>
        <p className="text-lg mb-4">
          Takusa Blog is a simple blog platform where users can create posts,
          share their thoughts, and comment on others' posts. It’s designed to
          practice full-stack development concepts and showcase a functional
          project.
        </p>
        <p className="text-lg">
          You can explore posts, interact with the community, and learn how a
          basic social platform works. This project serves as a learning
          experience and a portfolio piece for showcasing frontend and backend
          skills.
        </p>
      </div>
    </div>
  );
}
