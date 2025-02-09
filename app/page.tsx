"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import UserProfile from "@/components/UserProfile"
import { mockUsers as originalMockUsers } from "@/utils/mockData"

const mockUsers = originalMockUsers.map((user) => ({
  ...user,
  upvotes: Math.floor(Math.random() * 1000), // Random number of upvotes between 0 and 999
}))

export default function Home() {
  const [users, setUsers] = useState(mockUsers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)

  const handleSwipe = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up" && currentIndex < users.length - 1) {
        setSwipeDirection(1)
        setCurrentIndex((prevIndex) => prevIndex + 1)
      } else if (direction === "down" && currentIndex > 0) {
        setSwipeDirection(-1)
        setCurrentIndex((prevIndex) => prevIndex - 1)
      }
    },
    [currentIndex, users.length],
  )

  const handlers = useSwipeable({
    onSwipedUp: () => handleSwipe("up"),
    onSwipedDown: () => handleSwipe("down"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        handleSwipe("down")
      } else if (event.key === "ArrowDown") {
        handleSwipe("up")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleSwipe])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setCurrentY(e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentY(e.clientY)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      const diff = currentY - startY
      if (Math.abs(diff) > 100) {
        // threshold for swipe
        if (diff > 0) {
          handleSwipe("down")
        } else {
          handleSwipe("up")
        }
      }
      setIsDragging(false)
    }
  }

  const handleUpvote = useCallback((id: string) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, upvotes: user.upvotes + 1 } : user)))
  }, [])

  const currentUser = users[currentIndex]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl"></div>
        <div className="w-full h-full pt-7 pb-2 px-2">
          <div
            className="w-full h-full bg-gray-900 rounded-[40px] overflow-hidden relative"
            {...handlers}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <AnimatePresence mode="wait">
              <UserProfile
                key={currentIndex}
                id={currentUser.id}
                username={currentUser.username}
                name={currentUser.name}
                profileImageUrl={currentUser.profileImageUrl}
                description={currentUser.description}
                direction={swipeDirection}
                upvotes={currentUser.upvotes}
                onUpvote={handleUpvote}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

