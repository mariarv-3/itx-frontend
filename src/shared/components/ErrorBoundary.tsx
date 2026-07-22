import { Component, ErrorInfo, ReactNode } from "react";
import { EmptyState } from "./EmptyState";
import { dictionary } from "../i18n/en";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <EmptyState 
            title={dictionary.errorBoundary.title} 
            description={dictionary.errorBoundary.description} 
            action={
              <button 
                onClick={() => window.location.reload()}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "99px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem"
                }}
              >
                {dictionary.errorBoundary.action}
              </button>
            } 
          />
        </div>
      );
    }

    return this.props.children;
  }
}
