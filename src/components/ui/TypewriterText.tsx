"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  words: string[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Delete speed in ms per character */
  deleteSpeed?: number;
  /** Pause between words in ms */
  pauseMs?: number;
  className?: string;
  cursorClassName?: string;
  /** Whether to loop infinitely */
  loop?: boolean;
}

export function TypewriterText({
  words,
  speed = 70,
  deleteSpeed = 40,
  pauseMs = 1800,
  className,
  cursorClassName,
  loop = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));

        if (displayedText.length + 1 === currentWord.length) {
          // Done typing — pause before deleting
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            if (loop || wordIndex < words.length - 1) {
              setIsDeleting(true);
            }
          }, pauseMs);
          return;
        }
      } else {
        // Deleting
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));

        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayedText, isDeleting, isPaused, wordIndex, words, speed, deleteSpeed, pauseMs, loop]);

  return (
    <span className={className}>
      <motion.span
        key={displayedText}
        style={{ display: "inline" }}
      >
        {displayedText}
      </motion.span>
      <span
        className={cursorClassName ?? "typewriter-cursor"}
        aria-hidden="true"
      />
    </span>
  );
}
