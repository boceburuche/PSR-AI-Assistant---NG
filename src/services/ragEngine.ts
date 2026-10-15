import { PSR_RULES_DATABASE } from '../data/psrCorpus';
import { PSRRule, RAGRetrievalResult } from '../types/psr';

// Common synonyms and term expansions for Nigerian Civil Service terminology
const SYNONYM_EXPANSIONS: Record<string, string[]> = {
  preamble: ['pepple', 'head of service', 'ohcsf', 'numbering', 'six digits', 'circulars', 'five years', 'monetization', 'procurement', '000002'],
  pepple: ['preamble', 'head of service', 'ohcsf', 'the presidency', '000002'],
  numbering: ['method of numbering', 'six digits', '6 digits', 'chapter section rule', 'ccssrr', 'preamble', '000002'],
  foreword: ['forward', 'preamble', 'yaradua', 'presidential', 'transparency', 'accountability', 'due process', 'rule of law', '000001'],
  forward: ['foreword', 'preamble', 'yaradua', 'presidential', 'transparency', 'accountability', 'due process', 'rule of law', '000001'],
  yaradua: ['foreword', 'forward', 'president', 'state house', 'abuja', '000001'],
  contents: ['table of contents', 'chapters', 'subjects', 'index', '16 chapters', '000003'],
  table: ['table of contents', 'contents', 'chapters', '000003'],
  index: ['master index', 'alphabetical index', 'table of contents', '000003', 'rulebook index'],
  chapter: ['chapters', 'table of contents', '000003', '16 chapters', 'subjects'],
  subject: ['subjects', 'table of contents', 'chapters', '000003'],
  parastatals: ['parastatal', 'chapter 16', '160101', 'boards', 'council', '000003'],
  transport: ['free transport', 'chapter 11', '110101', '110202', 'travel'],
  courses: ['training', 'instruction', 'chapter 12', '120101', 'technical assistance', 'bonds'],
  ethics: ['foreword', 'transparency', 'accountability', 'justice', 'equity', 'due process', 'rule of law', '110101'],
  acquaint: ['duty of every officer', 'extant circulars', '010101', 'application'],
  constitutional: ['president', 'vice president', 'chief justice', 'statutory bodies', 'fcsc', 'inec', 'fcc', 'cct', 'rmafc', 'npc', 'psc', 'auditor-general', '010101'],
  definitions: ['general definitions', 'special definitions', '010102', '010103', 'head of department', 'established post'],
  emolument: ['total remuneration package', 'letter of appointment', '010103'],
  child: ['under 18', 'biological', 'step-child', 'adopted', 'dependent', '010103'],
  executive: ['general executive cadre', 'ceo', 'peo', 'heo', 'aeo', 'gl 07', 'gl 14', '010103'],
  female: ['gender equality', 'female public servants', 'masculine gender', '010105', 'women'],
  women: ['female public servants', 'gender equality', '010105'],
  inventory: ['copy of psr', 'inventory of items', '010106', 'all offices'],
  amend: ['revoke', 'powers of federal government', '010104'],
  query: ['exculpation', 'form gen 16', '48 hours', '030302', '030304', 'disciplinary'],
  interdiction: ['half salary', '50%', '010103', '030403', '030404', 'surrender', 'protective'],
  suspension: ['zero pay', '010103', '030406', 'remand', 'prima facie', 'criminal case'],
  dismissal: ['forfeiture of pension', '030409', 'terminal benefits', 'serious misconduct'],
  paternity: ['male officer', '14 working days', '060207', 'newborn', 'spouse'],
  maternity: ['16 weeks', '4 months', '060206', 'nursing break', 'female officer'],
  leave: ['annual leave', 'casual leave', '060201', '060204', 'study leave'],
  promotion: ['maturity period', '020701', 'GL 07', 'GL 14', 'GL 15', 'pms', 'aper', 'examination'],
  probation: ['2 years', 'confirmation', '020205', 'CCE exam', 'recruit'],
  retirement: ['60 years', '35 years', '080201', 'pre-retirement', '060301', 'pencom'],
  tenure: ['director', '8 years', 'permanent secretary', '4 years', '020908'],
  dta: ['duty tour allowance', '040201', 'per diem', 'traveling allowance', 'lodging'],
  farming: ['private business', '030424', '110101', 'commercial', 'company'],
  secrets: ['oath of secrecy', '100101', '100203', 'social media leak', 'classified'],
  social: ['whatsapp', 'media leak', '100203', 'classified memo'],
};

export class RAGEngine {
  private static rules: PSRRule[] = PSR_RULES_DATABASE;

  /**
   * Extract explicit rule numbers mentioned in query (e.g. "030402", "Rule 020701", "000001")
   */
  private static extractRuleNumbers(query: string): string[] {
    const matches = query.match(/\b\d{5,6}\b/g) || [];
    return matches.map(m => m.padStart(6, '0'));
  }

  /**
   * Retrieves relevant PSR rules using multi-tier hybrid matching
   */
  public static retrieveRules(query: string, limit: number = 4): RAGRetrievalResult[] {
    const normalizedQuery = query.toLowerCase();
    const explicitRules = this.extractRuleNumbers(normalizedQuery);
    const queryTokens = normalizedQuery.split(/\s+/).filter(t => t.length > 2);

    // Expand search tokens with synonyms
    const expandedTokens = new Set<string>(queryTokens);
    for (const token of queryTokens) {
      for (const [key, synonyms] of Object.entries(SYNONYM_EXPANSIONS)) {
        if (token.includes(key) || key.includes(token)) {
          synonyms.forEach(s => expandedTokens.add(s.toLowerCase()));
        }
      }
    }

    const scoredResults: RAGRetrievalResult[] = this.rules.map(rule => {
      let score = 0;
      const matchedTerms: string[] = [];
      let relevanceReason = '';

      // Tier 1: Direct Rule Number Match
      if (explicitRules.includes(rule.ruleNumber) || normalizedQuery.includes(rule.ruleNumber)) {
        score += 100;
        matchedTerms.push(`Rule ${rule.ruleNumber}`);
        relevanceReason = `Direct match for statutory Rule ${rule.ruleNumber}`;
      }

      // Tier 2: Title & Summary Match
      const ruleTitleLower = rule.title.toLowerCase();
      const ruleSummaryLower = rule.summary.toLowerCase();
      const ruleTextLower = rule.fullText.toLowerCase();

      for (const token of expandedTokens) {
        if (ruleTitleLower.includes(token)) {
          score += 15;
          if (!matchedTerms.includes(token)) matchedTerms.push(token);
        } else if (ruleSummaryLower.includes(token)) {
          score += 8;
          if (!matchedTerms.includes(token)) matchedTerms.push(token);
        } else if (ruleTextLower.includes(token)) {
          score += 4;
        }
      }

      // Tier 3: Tag matches
      for (const tag of rule.tags) {
        if (normalizedQuery.includes(tag.toLowerCase())) {
          score += 12;
          if (!matchedTerms.includes(tag)) matchedTerms.push(tag);
        }
      }

      // Tier 4: Chapter topic matches
      if (normalizedQuery.includes(rule.chapterTitle.toLowerCase())) {
        score += 10;
      }

      if (!relevanceReason && matchedTerms.length > 0) {
        relevanceReason = `Matches topics: ${matchedTerms.slice(0, 3).join(', ')}`;
      }

      return {
        rule,
        score,
        matchedTerms,
        relevanceReason: relevanceReason || 'General PSR administrative framework'
      };
    });

    // Sort by score descending and take top N with score > 0
    const filtered = scoredResults
      .filter(res => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // If query has no matches, return high-level general rules (Chapter 1 & 3 basics)
    if (filtered.length === 0) {
      return [
        {
          rule: this.rules.find(r => r.ruleNumber === '010101') || this.rules[0],
          score: 1,
          matchedTerms: ['general'],
          relevanceReason: 'Default regulatory framework reference'
        },
        {
          rule: this.rules.find(r => r.ruleNumber === '030102') || this.rules[1],
          score: 1,
          matchedTerms: ['procedure'],
          relevanceReason: 'Standard disciplinary classification overview'
        }
      ];
    }

    return filtered;
  }

  /**
   * Synthesize statutory context block for Gemini grounding
   */
  public static buildRAGContext(results: RAGRetrievalResult[]): string {
    return results.map(res => {
      const r = res.rule;
      return `--- STATUTORY RULE REFERENCE [PSR RULE ${r.ruleNumber}] ---
Chapter: Chapter ${r.chapter} (${r.chapterTitle})
Section: ${r.section}
Title: ${r.title}
Statutory Provision:
${r.fullText}
Key Operational Directives:
${r.keyPoints.map(p => `• ${p}`).join('\n')}
${r.timelineDays ? `Statutory Timeline: ${r.timelineDays} days/hours` : ''}
${r.penaltyOrConsequence ? `Consequence of Breach: ${r.penaltyOrConsequence}` : ''}
${r.applicableGrades ? `Applicable Cadres: ${r.applicableGrades.join(', ')}` : ''}`;
    }).join('\n\n');
  }

  /**
   * Client-side fallback generation when offline or disconnected
   */
  public static generateOfflineResponse(query: string, results: RAGRetrievalResult[], officerCadre?: string): string {
    if (results.length === 0) {
      return `According to the Revised Public Service Rules (PSR 2021), official actions in the Federal Civil Service must strictly adhere to statutory procedures. Please specify the rule number, grade level, or administrative scenario (e.g. Promotion maturity, Paternity leave, Query response within 48 hours).`;
    }

    const topResult = results[0];
    const topRule = topResult.rule;

    let response = `### Regulatory Guidance Under Revised PSR 2021\n\n`;
    
    // Verbatim full text for Foreword, Preamble, and Table of Contents
    if (['000001', '000002', '000003'].includes(topRule.ruleNumber)) {
      response += `**${topRule.title.toUpperCase()}**\n\n`;
      response += `\`\`\`text\n${topRule.fullText}\n\`\`\`\n\n`;
      response += `**Key Statutory Directives:**\n`;
      topRule.keyPoints.forEach(point => {
        response += `- ${point}\n`;
      });
      response += `\n*Source: Official Revised Public Service Rules (PSR 2021 Edition), Office of the Head of the Civil Service of the Federation (OHCSF) / Office of the Accountant-General of the Federation (OAGF).*`;
      return response;
    }

    response += `Based on statutory provisions of **Chapter ${topRule.chapter} (PSR Rule ${topRule.ruleNumber})**: *${topRule.title}*:\n\n`;
    response += `**Statutory Interpretation:**\n${topRule.summary}\n\n`;
    response += `**Key Rules of Engagement:**\n`;
    topRule.keyPoints.forEach(point => {
      response += `- ${point}\n`;
    });

    if (topRule.timelineDays) {
      response += `\n⏱️ **Statutory Timeline:** Must be complied with within **${topRule.timelineDays} days/hours**.\n`;
    }

    if (topRule.penaltyOrConsequence) {
      response += `\n⚠️ **Consequence of Non-Compliance:** ${topRule.penaltyOrConsequence}\n`;
    }

    if (results.length > 1) {
      response += `\n**Related Statutory Provisions:**\n`;
      results.slice(1).forEach(r => {
        response += `- **Rule ${r.rule.ruleNumber}**: ${r.rule.title} (${r.rule.chapterTitle})\n`;
      });
    }

    response += `\n*Source: Official Revised Public Service Rules (PSR 2021 Edition), Office of the Head of the Civil Service of the Federation (OHCSF) / Office of the Accountant-General of the Federation (OAGF).*`;
    return response;
  }
}
