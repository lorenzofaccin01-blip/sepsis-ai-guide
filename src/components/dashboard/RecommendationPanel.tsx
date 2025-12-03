import { AntibioticRecommendation } from '@/types/patient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Pill, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  FileText,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationPanelProps {
  recommendations: AntibioticRecommendation[];
}

interface RecommendationCardProps {
  recommendation: AntibioticRecommendation;
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { isPrimary, drugs, targetPathogens, rationale, stewardshipScore, contraindications, adjustments } = recommendation;

  return (
    <div
      className={cn(
        'recommendation-card',
        isPrimary ? 'recommendation-primary' : 'recommendation-alternative'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isPrimary ? (
            <Badge className="bg-primary text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Primary Recommendation
            </Badge>
          ) : (
            <Badge variant="secondary">Alternative Option</Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Stewardship</span>
          <Badge
            variant="outline"
            className={cn(
              stewardshipScore >= 80 && 'border-success text-success',
              stewardshipScore >= 60 && stewardshipScore < 80 && 'border-warning text-warning',
              stewardshipScore < 60 && 'border-critical text-critical'
            )}
          >
            {stewardshipScore}%
          </Badge>
        </div>
      </div>

      {/* Drug Regimen */}
      <div className="space-y-2 mb-4">
        {drugs.map((drug, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Pill className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{drug.name}</p>
                <p className="text-sm text-muted-foreground">
                  {drug.dose} {drug.route} {drug.frequency}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Target Pathogens */}
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          <Target className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Target Pathogens
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {targetPathogens.map((pathogen, idx) => (
            <Badge key={idx} variant="outline" className="font-normal text-xs">
              {pathogen}
            </Badge>
          ))}
        </div>
      </div>

      {/* Rationale */}
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Rationale
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{rationale}</p>
      </div>

      {/* Adjustments */}
      {adjustments.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <CheckCircle2 className="w-4 h-4 text-info" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Dosing Adjustments
            </span>
          </div>
          <ul className="space-y-1">
            {adjustments.map((adj, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <ChevronRight className="w-3 h-3 mt-1 text-info shrink-0" />
                {adj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contraindications */}
      {contraindications.length > 0 && (
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className="w-4 h-4 text-warning" />
            <span className="text-xs font-medium text-warning uppercase tracking-wide">
              Cautions
            </span>
          </div>
          <ul className="space-y-1">
            {contraindications.map((ci, idx) => (
              <li key={idx} className="text-sm text-foreground">
                {ci}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Button className="flex-1" variant={isPrimary ? 'default' : 'secondary'}>
          {isPrimary ? 'Accept & Order' : 'Select Alternative'}
        </Button>
        <Button variant="outline">View Details</Button>
      </div>
    </div>
  );
}

export function RecommendationPanel({ recommendations }: RecommendationPanelProps) {
  const primaryRec = recommendations.find(r => r.isPrimary);
  const alternatives = recommendations.filter(r => !r.isPrimary);

  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              AI Antibiotic Recommendation
            </h3>
            <p className="text-xs text-muted-foreground">
              Based on clinical data, risk factors, and local antibiogram
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Mode B: Rapid diagnostics integrated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
          </div>
        </div>

        {primaryRec && <RecommendationCard recommendation={primaryRec} />}
      </div>

      {alternatives.length > 0 && (
        <div className="panel p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Alternative Regimens
          </h4>
          <div className="space-y-4">
            {alternatives.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
