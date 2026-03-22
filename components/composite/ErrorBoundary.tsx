"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import logger from "@/lib/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorInfo: info });

    logger.error(
      {
        component: "ErrorBoundary",
        label: this.props.label ?? "unknown",
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
        componentStack: info.componentStack,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      },
      "Unhandled React error caught by ErrorBoundary",
    );
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      if (this.props.fallback) return this.props.fallback;

      const isDev = process.env.NODE_ENV === "development";

      return (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 py-6 text-center"
        >
          <p className="text-sm font-medium text-neutral-700">
            Something went wrong
            {this.props.label ? ` in ${this.props.label}` : ""}.
          </p>

          {isDev && error && (
            <div className="w-full max-w-2xl rounded-md border border-red-200 bg-red-50 p-3 text-left">
              <p className="mb-1 text-xs font-semibold text-red-700">
                {error.name}: {error.message}
              </p>
              {error.stack && (
                <pre className="overflow-auto whitespace-pre-wrap text-xs text-red-600">
                  {error.stack}
                </pre>
              )}
              {errorInfo?.componentStack && (
                <>
                  <p className="mb-1 mt-2 text-xs font-semibold text-red-700">
                    Component stack:
                  </p>
                  <pre className="overflow-auto whitespace-pre-wrap text-xs text-red-500">
                    {errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button onClick={this.handleReset} className="cursor-pointer">
              Try again
            </Button>
            {!isDev && (
              <p className="text-xs text-neutral-400">or refresh the page</p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
