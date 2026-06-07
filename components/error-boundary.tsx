"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for debugging (in production you can send to error reporting)
    console.error("Dashboard ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    // Soft reload the component tree
    this.setState({ hasError: false, error: undefined });
    // Or hard reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] items-center justify-center p-6">
          <Card className="w-full max-w-md rounded-3xl border border-red-200 bg-white/95 shadow-xl dark:border-red-900/50 dark:bg-zinc-950">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950">
                <AlertTriangle className="size-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                The dashboard encountered an unexpected error. This can happen on certain mobile devices or network conditions.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Try reloading. If it keeps happening, please let us know.
              </p>

              <Button
                onClick={this.handleReload}
                className="mt-2 w-full rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                size="lg"
              >
                <RefreshCw className="mr-2 size-4" />
                Reload Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
