import React from "react";

export function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer complementary soft teal background circle for safe zone feeling */}
        <circle cx="50" cy="50" r="48" fill="#E6F6F5" />
        
        {/* Accent complementary warm orange/amber pulse rings */}
        <circle cx="50" cy="50" r="38" stroke="#FFB020" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        <circle cx="50" cy="50" r="28" stroke="#FFB020" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />

        {/* Primary Blue base shape: Shield / Core */}
        <path
          d="M50 20C32 20 28 32 28 32V55C28 72 50 85 50 85C50 85 72 72 72 55V32C72 32 68 20 50 20Z"
          fill="#0056D2"
        />

        {/* Primary Red Emergency Cross / Signal */}
        <path
          d="M45 40H55V65H45V40ZM35 48H65V57H35V48Z"
          fill="#E3000F"
        />
        
        {/* Secondary complementary teal dot / safe core */}
        <circle cx="50" cy="52.5" r="4" fill="#00A699" />
      </svg>
    </div>
  );
}
