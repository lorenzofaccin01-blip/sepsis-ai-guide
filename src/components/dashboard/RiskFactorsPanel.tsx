import { Patient } from '@/types/patient';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskFactorsPanelProps {
  patient: Patient;
}

interface RiskItemProps {
  label: string;
  present: boolean;
  isHighRisk?: boolean;
}

function RiskItem({ label, present, isHighRisk }: RiskItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {present ? (
        <Badge
          className={cn(
            'font-normal',
            isHighRisk ? 'bg-critical text-critical-foreground' : 'bg-warning text-warning-foreground'
          )}
        >
          {isHighRisk && <AlertTriangle className="w-3 h-3 mr-1" />}
          Present
        </Badge>
      ) : (
        <Badge variant="outline" className="font-normal text-muted-foreground">
          <XCircle className="w-3 h-3 mr-1" />
          Absent
        </Badge>
      )}
    </div>
  );
}

export function RiskFactorsPanel({ patient }: RiskFactorsPanelProps) {
  const { riskFactors, imagingFindings } = patient;

  return (
    <div className="panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <Stethoscope className="w-5 h-5 text-foreground" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Risk Factors & Imaging
        </h3>
      </div>

      {/* MDR Risk Factors */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          MDR Risk Factors
        </h4>
        <div>
          <RiskItem label="MRSA Risk" present={riskFactors.mrsa} isHighRisk />
          <RiskItem label="Pseudomonas Risk" present={riskFactors.pseudomonas} isHighRisk />
          <RiskItem label="Prior MDR Colonization" present={riskFactors.priorMDRColonization} isHighRisk />
          <RiskItem label="Recent Hospitalization (90d)" present={riskFactors.recentHospitalization} />
          <RiskItem label="Recent IV Antibiotics (90d)" present={riskFactors.recentIVAntibiotics} />
        </div>
      </div>

      {/* Comorbidities */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Comorbidities
        </h4>
        <div>
          <RiskItem label="COPD" present={riskFactors.copd} />
          <RiskItem label="Chronic Lung Disease" present={riskFactors.chronicLungDisease} />
          <RiskItem label="Diabetes" present={riskFactors.diabetes} />
          <RiskItem label="Immunosuppression" present={riskFactors.immunosuppression} />
          <RiskItem label="Renal Failure" present={riskFactors.renalFailure} />
          <RiskItem label="Hepatic Failure" present={riskFactors.hepaticFailure} />
        </div>
      </div>

      {/* Imaging Findings */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Chest Imaging Findings
        </h4>
        <div className="flex flex-wrap gap-2">
          {imagingFindings.lobarInfiltrate && (
            <Badge variant="secondary">Lobar Infiltrate</Badge>
          )}
          {imagingFindings.bilateralInfiltrates && (
            <Badge className="bg-warning text-warning-foreground">Bilateral Infiltrates</Badge>
          )}
          {imagingFindings.cavitations && (
            <Badge className="bg-critical text-critical-foreground">Cavitations</Badge>
          )}
          {imagingFindings.pleuralEffusion && (
            <Badge variant="secondary">Pleural Effusion</Badge>
          )}
          {imagingFindings.consolidation && (
            <Badge variant="secondary">Consolidation</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
