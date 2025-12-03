import { Header } from '@/components/dashboard/Header';
import { PatientBanner } from '@/components/dashboard/PatientBanner';
import { VitalsPanel } from '@/components/dashboard/VitalsPanel';
import { LabsPanel } from '@/components/dashboard/LabsPanel';
import { SOFAPanel } from '@/components/dashboard/SOFAPanel';
import { SafetyPanel } from '@/components/dashboard/SafetyPanel';
import { RecommendationPanel } from '@/components/dashboard/RecommendationPanel';
import { RiskFactorsPanel } from '@/components/dashboard/RiskFactorsPanel';
import { mockPatient, mockRecommendations, mockSafetyAlerts } from '@/data/mockPatient';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-4 lg:p-6 max-w-[1800px] mx-auto">
        {/* Patient Banner */}
        <div className="mb-6 animate-fade-in">
          <PatientBanner patient={mockPatient} />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Patient Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <VitalsPanel patient={mockPatient} />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <LabsPanel patient={mockPatient} />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <SOFAPanel patient={mockPatient} />
            </div>
          </div>

          {/* Center Column - AI Recommendations */}
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <RecommendationPanel recommendations={mockRecommendations} />
          </div>

          {/* Right Column - Safety & Risk */}
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <SafetyPanel patient={mockPatient} alerts={mockSafetyAlerts} />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <RiskFactorsPanel patient={mockPatient} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
