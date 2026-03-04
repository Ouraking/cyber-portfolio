"use client";

import { useState, useEffect } from "react";

interface TypedTextOptions {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms delay before starting */
  startDelay?: number;
  /** callback when typing completes */
  onComplete?: () => void;
}

export function useTypedText({
  text,
  speed = 35,
  startDelay = 0,
  onComplete,
}: TypedTextOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);

      const typeChar = () => {
        if (charIndex < text.length) {
          charIndex++;
          setDisplayText(text.slice(0, charIndex));
          timeoutId = setTimeout(typeChar, speed);
        } else {
          setIsTyping(false);
          setIsDone(true);
          onComplete?.();
        }
      };

      typeChar();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay]);

  return { displayText, isTyping, isDone };
}
