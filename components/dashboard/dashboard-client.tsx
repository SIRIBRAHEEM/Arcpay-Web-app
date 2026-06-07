"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EventWatcher } from "@/components/dashboard/event-watcher";
import { MobileDashboardSection } from "@/components/dashboard/mobile-dashboard-section";
import { PremiumDashboardHero } from "@/components/dashboard/p