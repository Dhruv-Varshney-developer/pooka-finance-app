import React from "react";
import "./styles.scss";

export const GraphSkeleton: React.FC = () => {
  return (
    <div className="graph-skeleton">
      <div className="graph-skeleton__header" />
      <div className="graph-skeleton__bars">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="graph-skeleton__bar" />
        ))}
      </div>
    </div>
  );
};

