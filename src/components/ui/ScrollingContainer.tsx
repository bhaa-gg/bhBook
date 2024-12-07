import React from "react";
import { useInView } from "react-intersection-observer";

interface ScrollingContainerInterface extends React.PropsWithChildren {
  onBottomReached: () => void;
  className: string;
}

const ScrollingContainer = ({
  className,
  children,
  onBottomReached,
}: ScrollingContainerInterface) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(InView) {
      if (InView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref}></div>
    </div>
  );
};

export default ScrollingContainer;
