import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Root } from "./Root";
import { Home } from "./components/Home";

// Lazy-loaded components for better performance
const UPIBalancePage = lazy(() => import("./components/case-studies/upi-balance/index"));
const LocalAIManagerPage = lazy(() => import("./components/case-studies/localai-manager/index"));
const NirmaanFinancialPage = lazy(() => import("./components/case-studies/nirmaan-financial/index"));
const FluxKeyConsolePage = lazy(() => import("./components/case-studies/fluxkey-console/index"));

// Fallback component (could be replaced with a skeleton later)
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-zinc-400"></div>
  </div>
);

// Wrapper with Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "case-studies/upi-balance",
        element: <SuspenseWrapper><UPIBalancePage /></SuspenseWrapper>
      },
      {
        path: "case-studies/localai-manager",
        element: <SuspenseWrapper><LocalAIManagerPage /></SuspenseWrapper>
      },
      {
        path: "case-studies/nirmaan-financial",
        element: <SuspenseWrapper><NirmaanFinancialPage /></SuspenseWrapper>
      },
      {
        path: "case-studies/fluxkey-console",
        element: <SuspenseWrapper><FluxKeyConsolePage /></SuspenseWrapper>
      },
    ],
  },
]);
