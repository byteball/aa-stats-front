/* eslint-disable no-unused-vars */
import ReactGA from 'react-ga4';

enum AnalyticsActions {
  SEARCH = 'search',
  HOMEPAGE = 'homepageClick',
  EXPLORER = 'explorerClick',
  GITHUB = 'githubClick',
  NAVIGATION = 'navigation',
}

const sendToAnalytics = (analyticsData: {
  action: string;
  value?: number;
  label?: string;
}): void => {
  if (ReactGA.isInitialized) {
    ReactGA.event({ category: 'my_events', ...analyticsData });
  }
};

export const fireSearchAnalitycsEvent = (searchText: string): void =>
  sendToAnalytics({ action: AnalyticsActions.SEARCH, label: searchText });

export const homepageAnalyticsClickEvent = (): void =>
  sendToAnalytics({ action: AnalyticsActions.HOMEPAGE });

export const explorerAnalyticsClickEvent = (): void =>
  sendToAnalytics({ action: AnalyticsActions.EXPLORER });

export const githubAnalyticsClickEvent = (): void =>
  sendToAnalytics({ action: AnalyticsActions.GITHUB });

export const fireNavigationAnalyticsEvent = (fullUrl: string): void =>
  sendToAnalytics({ action: AnalyticsActions.NAVIGATION, label: fullUrl });
