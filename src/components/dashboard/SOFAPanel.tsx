import { Patient } from '@/types/patient';
import { cn } from '@/lib/utils';

interface SOFAPanelProps {
  patient: Patient;
}

interface SOFAComponentProps {
  label: string;
  score: number;
  maxScore: number;
}

function SOFAComponent({ label, score, maxScore }: SOFAComponentProps) {
  const percentage = (score / maxScore) * 100;

  const getBarColor = (score: number) => {
    if (score >= 3) return 'bg-critical';
    if (score >= 2) return 'bg-warning';
    if (score >= 1) return 'bg-info';
    return 'bg-success';
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28 truncate">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', getBarColor(score))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-foreground w-6 text-right">{score}</span>
    </div>
  );
}

export function SOFAPanel({ patient }: SOFAPanelProps) {
  const { sofaScore } = patient;

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          SOFA Score Breakdown
        </h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-foreground">{sofaScore.total}</span>
          <span className="text-sm text-muted-foreground">/24</span>
        </div>
      </div>
      <div className="space-y-3">
        <SOFAComponent label="Respiration" score={sofaScore.respiration} maxScore={4} />
        <SOFAComponent label="Coagulation" score={sofaScore.coagulation} maxScore={4} />
        <SOFAComponent label="Liver" score={sofaScore.liver} maxScore={4} />
        <SOFAComponent label="Cardiovascular" score={sofaScore.cardiovascular} maxScore={4} />
        <SOFAComponent label="CNS (GCS)" score={sofaScore.cns} maxScore={4} />
        <SOFAComponent label="Renal" score={sofaScore.renal} maxScore={4} />
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Score ≥2 indicates organ dysfunction. Current score suggests{' '}
          <span className="font-semibold text-critical">high mortality risk (50-60%)</span>.
        </p>
      </div>
    </div>
  );
}
