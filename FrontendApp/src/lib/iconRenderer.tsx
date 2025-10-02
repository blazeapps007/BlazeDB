import { BarChart3, Eye, MessageCircle, Map, Users, Globe, Gamepad2, TrendingUp } from 'lucide-react';
import React from 'react';

// Helper function to check if a string is a valid URL
const isUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const renderIcon = (iconString: string): React.ReactNode => {
  // First, check if the iconString is a URL
  if (isUrl(iconString)) {
    // If it is, render it as an image, ideal for avatars
    return <img src={iconString} alt="DApp Avatar" className="w-12 h-12 rounded-full" />;
  }

  // --- If it's not a URL, use the original logic ---

  // Extract the icon name from the string like "<BarChart3 className=\"w-6 h-6\" />"
  const iconMatch = iconString.match(/<(\w+)/);
  if (!iconMatch) return <Globe className="w-12 h-12" />; // Default fallback

  const iconName = iconMatch[1];
  
  // Render the appropriate component based on the icon name
  switch (iconName) {
    case 'BarChart3':
      return <BarChart3 className="w-12 h-12" />;
    case 'Eye':
      return <Eye className="w-12 h-12" />;
    case 'MessageCircle':
      return <MessageCircle className="w-12 h-12" />;
    case 'Map':
      return <Map className="w-12 h-12" />;
    case 'Users':
      return <Users className="w-12 h-12" />;
    case 'Globe':
      return <Globe className="w-12 h-12" />;
    case 'Gamepad2':
      return <Gamepad2 className="w-12 h-12" />;
    // I also added the 'TrendingUp' icon from your previous JSON for UPEX
    case 'TrendingUp':
        return <TrendingUp className="w-12 h-12" />;
    default:
      // If no match is found, return a default icon
      return <Globe className="w-12 h-12" />;
  }
};
