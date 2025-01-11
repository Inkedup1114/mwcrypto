'use client'

import React from 'react'

export default function Learn() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Learn</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Resources</h2>
          <p className="text-gray-600 mb-4">
            Access our comprehensive learning materials and resources.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Documentation</li>
            <li>Tutorials</li>
            <li>Best Practices</li>
            <li>Case Studies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}