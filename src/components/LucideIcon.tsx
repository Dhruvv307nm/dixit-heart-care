import React from 'react';
import {
  HeartPulse,
  Heart,
  TrendingUp,
  Clock,
  Droplet,
  Stethoscope,
  Calendar,
  ShieldAlert,
  DollarSign,
  PhoneCall,
  MapPin,
  MessageSquare,
  AlertOctagon,
  ChevronRight,
  CheckCircle2,
  Info,
  CalendarDays,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  HeartPulse,
  Heart,
  TrendingUp,
  Clock,
  Droplet,
  Stethoscope,
  Calendar,
  ShieldAlert,
  DollarSign,
  PhoneCall,
  MapPin,
  MessageSquare,
  AlertOctagon,
  ChevronRight,
  CheckCircle2,
  Info,
  CalendarDays,
  FileCheck2,
  ArrowRight
};

export type IconType = keyof typeof iconMap;

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 24 }: LucideIconProps) {
  const IconComponent = iconMap[name as IconType] || HeartPulse;
  return <IconComponent className={className} size={size} />;
}
