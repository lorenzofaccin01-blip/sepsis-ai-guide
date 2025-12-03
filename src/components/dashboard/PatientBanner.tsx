import { Patient } from '@/types/patient';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface PatientBannerProps {
  patient: Patient;
}

export function PatientBanner({ patient }: PatientBannerProps) {
  const getSofaSeverity = (score: number) => {
    if (score >= 12) return { label: 'Critical', className: 'bg-critical text-critical-foreground' };
    if (score >= 8) return { label: 'Severe', className: 'bg-warning text-warning-foreground' };
    if (score >= 4) return { label: 'Moderate', className: 'bg-info text-info-foreground' };
    return { label: 'Low', className: 'bg-success text-success-foreground' };
  };

  const sofaSeverity = getSofaSeverity(patient.sofaScore.total);

  return (
    <div className="panel p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-foreground">
                {patient.name}
              </h2>
              <Badge variant="outline" className="font-normal">
                {patient.sex} · {patient.age}y
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span>MRN: {patient.mrn}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {patient.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Admitted: {format(new Date(patient.admissionDate), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-foreground">
              Pneumonia-Induced Sepsis
            </span>
          </div>
          <div className="flex flex-col items-center px-4 py-2 rounded-lg bg-muted/50">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              SOFA Score
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {patient.sofaScore.total}
              </span>
              <Badge className={sofaSeverity.className}>
                {sofaSeverity.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
