declare module '@vercel/speed-insights/next' {
  import * as React from 'react';

  export interface SpeedInsightsProps {
    dsn?: string;
    sampleRate?: number;
    route?: string | null;
    beforeSend?: (event: unknown) => unknown;
    debug?: boolean;
    scriptSrc?: string;
    endpoint?: string;
  }

  export function SpeedInsights(props: Omit<SpeedInsightsProps, 'route'>): React.JSX.Element | null;
}

declare module '@vercel/analytics/react' {
  import * as React from 'react';

  export interface AnalyticsProps {
    mode?: 'development' | 'production';
    debug?: boolean;
    beforeSend?: (event: unknown) => unknown;
  }

  export function Analytics(props: AnalyticsProps): React.JSX.Element | null;
}
