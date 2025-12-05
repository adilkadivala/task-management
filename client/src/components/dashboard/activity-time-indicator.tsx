"use client";

interface RealTimeIndicatorProps {
  isConnected: boolean;
}

export function RealTimeIndicator({ isConnected }: RealTimeIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      <span className="text-sm text-muted-foreground">
        {isConnected ? "Live updates" : "Reconnecting..."}
      </span>
    </div>
  );
}
