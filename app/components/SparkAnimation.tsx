'use client';

import React from 'react';

export default function SparkAnimation() {
  React.useEffect(() => {
    const createSparks = () => {
      const container = document.createElement('div');
      container.className = 'spark-container';
      document.body.appendChild(container);

      // Create sparks with randomized positions and timing
      for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        // Random positioning and timing
        spark.style.left = Math.random() * 100 + '%';
        spark.style.animationDelay = Math.random() * 8 + 's';
        spark.style.animationDuration = 6 + Math.random() * 4 + 's';
        
        container.appendChild(spark);
      }
    };

    createSparks();

    // Cleanup function
    return () => {
      const container = document.querySelector('.spark-container');
      if (container) {
        container.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}