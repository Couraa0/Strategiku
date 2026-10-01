import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages Import
import { LandingPage } from '../pages/LandingPage';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { BusinessOnboarding } from '../pages/onboarding/BusinessOnboarding';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { BusinessProfilePage } from '../pages/business/BusinessProfilePage';
import { BusinessDataPage } from '../pages/business-data/BusinessDataPage';
import { TransactionsPage } from '../pages/transactions/TransactionsPage';
import { InsightsPage } from '../pages/bi/InsightsPage';
import { OpportunityCenterPage } from '../pages/opportunities/OpportunityCenterPage';
import { OpportunityDetailPage } from '../pages/opportunities/OpportunityDetailPage';
import { RecommendationsPage } from '../pages/recommendations/RecommendationsPage';
import { KnowledgeBasePage } from '../pages/knowledge/KnowledgeBasePage';
import { AIAssistantPage } from '../pages/assistant/AIAssistantPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { UMKMHubPage } from '../pages/umkm-hub/UMKMHubPage';
import { UMKMHubDetailPage } from '../pages/umkm-hub/UMKMHubDetailPage';
import { UMKMHubInputPage } from '../pages/umkm-hub/UMKMHubInputPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-mono">
        Memuat Strategiku Platform...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/umkm-hub" element={<UMKMHubPage />} />
      <Route path="/umkm-hub-input" element={<UMKMHubInputPage />} />
      <Route path="/umkm-hub/:id" element={<UMKMHubDetailPage />} />
      <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />

      {/* Protected Routes */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <BusinessOnboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business-profile"
        element={
          <ProtectedRoute>
            <BusinessProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business-data"
        element={
          <ProtectedRoute>
            <BusinessDataPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/insights"
        element={
          <ProtectedRoute>
            <InsightsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities"
        element={
          <ProtectedRoute>
            <OpportunityCenterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <RecommendationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/knowledge"
        element={
          <ProtectedRoute>
            <KnowledgeBasePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assistant"
        element={
          <ProtectedRoute>
            <AIAssistantPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
