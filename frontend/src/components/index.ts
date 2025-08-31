// src/components/index.ts
export { default as LandingPage } from './LandingPage';
export { default as LoginPage } from './LoginPage';
export { default as ProgramsPage } from './ProgramsPage';
export { default as ContactPage } from './ContactPage';

// Re-export from subdirectories
export * from './auth';
export * from './dashboards';
export * from './layout';
export * from './ui';