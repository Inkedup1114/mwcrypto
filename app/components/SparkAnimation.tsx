'use client';

import React from 'react';

export default function SparkAnimation() {
  React.useEffect(() => {
    const createSparks = () => {
      const container = document.createElement('div');
      container.className = 'spark-container';
      document.body.appendChild(container);

      // Create more sparks with varied properties
      for (let i = 0; i < 40; i++) {
        const spark = document.createElement('div');
        
        // Randomly assign different spark types
        const sparkType = Math.floor(Math.random() * 4);
        switch(sparkType) {
          case 0:
            spark.className = 'spark spark-small';
            break;
          case 1:
            spark.className = 'spark spark-medium';
            break;
          case 2:
            spark.className = 'spark spark-large';
            break;
          case 3:
            spark.className = 'spark spark-pulse';
            break;
        }
        
        // Random positioning and timing
        spark.style.left = Math.random() * 100 + '%';
        spark.style.animationDelay = Math.random() * 12 + 's';
        spark.style.animationDuration = 8 + Math.random() * 6 + 's';
        
        // Random movement pattern
        const pattern = Math.floor(Math.random() * 3);
        spark.dataset.pattern = pattern.toString();
        
        container.appendChild(spark);
      }

      // Create floating orbs
      for (let i = 0; i < 12; i++) {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(orb);
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

  return null;
}