import { Patient } from '@/types/patient';
import { cn } from '@/lib/utils';

interface LabsPanelProps {
  patient: Patient;
}

interface LabRowProps {
  label: string;
  value: number;
  unit: string;
  reference: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

function LabRow({ label, value, unit, reference, status }: LabRowProps) {
  const statusStyles = {
    normal: 'text-foreground',
    high: 'text-warning font-semibold',
    low: 'text-info font-semibold',
    critical: 'text-critical font-bold',
  };

  const indicatorStyles = {
    normal: 'bg-success',
    high: 'bg-warning',
    low: 'bg-info',
    critical: 'bg-critical',
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2">
        <div className={cn('w-2 h-2 rounded-full', indicatorStyles[status])} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={cn('text-sm', statusStyles[status])}>
          {value} {unit}
        </span>
        <span className="text-xs text-muted-foreground/70 w-24 text-right">
          {reference}
        </span>
      </div>
    </div>
  );
}

export function LabsPanel({ patient }: LabsPanelProps) {
  const { laboratory } = patient;

  return (
    <div className="panel p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
        Laboratory Values
      </h3>
      <div className="space-y-0">
        <LabRow
          label="WBC"
          value={laboratory.wbc}
          unit="×10³/μL"
          reference="4.5-11.0"
          status={laboratory.wbc > 15 ? 'critical' : laboratory.wbc > 11 ? 'high' : 'normal'}
        />
        <LabRow
          label="Platelets"
          value={laboratory.platelets}
          unit="×10³/μL"
          reference="150-400"
          status={laboratory.platelets < 100 ? 'critical' : laboratory.platelets < 150 ? 'low' : 'normal'}
        />
        <LabRow
          label="Creatinine"
          value={laboratory.creatinine}
          unit="mg/dL"
          reference="0.7-1.3"
          status={laboratory.creatinine > 2 ? 'critical' : laboratory.creatinine > 1.3 ? 'high' : 'normal'}
        />
        <LabRow
          label="Bilirubin"
          value={laboratory.bilirubin}
          unit="mg/dL"
          reference="0.1-1.2"
          status={laboratory.bilirubin > 2 ? 'critical' : laboratory.bilirubin > 1.2 ? 'high' : 'normal'}
        />
        <LabRow
          label="Procalcitonin"
          value={laboratory.procalcitonin}
          unit="ng/mL"
          reference="<0.5"
          status={laboratory.procalcitonin > 10 ? 'critical' : laboratory.procalcitonin > 2 ? 'high' : 'normal'}
        />
        <LabRow
          label="CRP"
          value={laboratory.crp}
          unit="mg/L"
          reference="<10"
          status={laboratory.crp > 200 ? 'critical' : laboratory.crp > 50 ? 'high' : 'normal'}
        />
        <LabRow
          label="PaO₂/FiO₂"
          value={laboratory.paO2FiO2}
          unit=""
          reference=">400"
          status={laboratory.paO2FiO2 < 200 ? 'critical' : laboratory.paO2FiO2 < 300 ? 'low' : 'normal'}
        />
      </div>
    </div>
  );
}
