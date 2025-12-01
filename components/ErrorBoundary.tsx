import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              عذراً، حدث خطأ ما
            </h1>
            <p className="text-gray-600 mb-6">
              نعتذر عن الإزعاج. حدث خطأ غير متوقع.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              إعادة تحميل الصفحة
            </button>
            {process.env.NODE_ENV === 'development' && error && (
              <div className="mt-6 p-4 bg-red-50 rounded text-left">
                <p className="text-sm text-red-800 font-mono">
                  {error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}
