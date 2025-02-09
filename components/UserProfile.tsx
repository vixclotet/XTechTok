import Image from "next/image"
import { motion } from "framer-motion"
import { ThumbsUp } from "lucide-react"

interface UserProfileProps {
  id: string
  username: string
  name: string
  profileImageUrl: string
  description: string
  direction?: number
  upvotes: number
  onUpvote: (id: string) => void
}

export default function UserProfile({
  id,
  username,
  name,
  profileImageUrl,
  description,
  direction = 0,
  upvotes,
  onUpvote,
}: UserProfileProps) {
  const isA16z = username === "a16z"

  const handleUpvote = () => {
    onUpvote(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: direction * 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -direction * 50 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className={`w-full h-full relative ${isA16z ? "bg-[#ff6b00]" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
        <Image
          src={profileImageUrl || "/placeholder.svg"}
          alt={`${name}'s profile picture`}
          fill
          className={`object-cover ${isA16z ? "object-contain p-12" : ""}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center mb-1">
            <h2 className="text-3xl font-bold mr-2 text-white">{name}</h2>
            <button
              onClick={handleUpvote}
              className="flex items-center bg-black/50 rounded-full px-2 py-1 transition-colors hover:bg-black/70"
            >
              <ThumbsUp className="w-3 h-3 text-white mr-1" />
              <span className="text-xs font-semibold text-white">{upvotes}k</span>
            </button>
          </div>
          <p className="text-lg text-gray-300 mb-3">@{username}</p>
          <p className="text-base text-gray-200 max-w-[80%]">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

