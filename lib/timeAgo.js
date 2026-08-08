export default function timeAgo(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const postDate = new Date(dateString);
  const diffMs = now - postDate; // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Facebook style: if > 20 days, show month & day (and year if different year)
  if (days > 20) {
    const isSameYear = postDate.getFullYear() === now.getFullYear();
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(isSameYear ? {} : { year: "numeric" }),
    });
  }

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 5) return `${seconds} seconds ago`;
  return "Just now";
}

