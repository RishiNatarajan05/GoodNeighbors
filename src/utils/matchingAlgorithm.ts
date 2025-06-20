import { UserProfile } from '../components/SkillQuestionnaire';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: number;
  location: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  certifications: string[];
  languages: string[];
  physicalRequirements: string[];
  workType: string[];
  organization: string;
  volunteersNeeded: number;
  volunteersAssigned: number;
  startDate: string;
  endDate?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export interface MatchResult {
  opportunity: Opportunity;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasons: string[];
}

// One-hot encoding for skills
const allSkills = [
  // Medical
  'First Aid', 'CPR', 'EMT', 'Nursing', 'Medical Doctor', 'Mental Health Support',
  // Technical
  'IT Support', 'Network Administration', 'Software Development', 'Data Analysis', 'GIS Mapping',
  // Logistics
  'Supply Chain Management', 'Inventory Management', 'Transportation', 'Warehouse Operations',
  // Communication
  'Translation', 'Public Speaking', 'Crisis Communication', 'Social Media Management',
  // Construction
  'Carpentry', 'Electrical Work', 'Plumbing', 'Heavy Equipment Operation', 'Building Inspection',
  // Administrative
  'Project Management', 'Event Planning', 'Documentation', 'Volunteer Coordination',
  // Safety
  'Search & Rescue', 'Fire Safety', 'Hazardous Materials', 'Security',
  // Other
  'Cooking', 'Childcare', 'Elder Care', 'Animal Care', 'Teaching'
];

const allCertifications = [
  'First Aid/CPR', 'EMT Certification', 'Fire Safety', 'Hazardous Materials',
  'Project Management', 'Mental Health First Aid', 'Disaster Response'
];

const allLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic', 'Russian', 'Portuguese', 'Japanese', 'Korean'
];

const allPhysicalCapabilities = [
  'Heavy Lifting', 'Long Distance Walking', 'Climbing', 'Working in Confined Spaces',
  'Working at Heights', 'Working in Extreme Weather', 'Driving'
];

const allPreferences = [
  'Working with Children', 'Working with Elderly', 'Working with Animals',
  'Indoor Work', 'Outdoor Work', 'Team Work', 'Independent Work', 'Leadership Roles', 'Technical Tasks', 'Manual Labor'
];

// Create one-hot encoding for a user profile
export function encodeUserProfile(userProfile: UserProfile): number[] {
  const encoding: number[] = [];

  // Skills encoding (1 if user has skill, 0 if not)
  allSkills.forEach(skill => {
    encoding.push(userProfile.skills.includes(skill) ? 1 : 0);
  });

  // Experience level (normalized to 0-1)
  encoding.push(userProfile.experienceLevel / 5);

  // Emergency response experience
  encoding.push(userProfile.emergencyResponse ? 1 : 0);

  // Certifications encoding
  allCertifications.forEach(cert => {
    encoding.push(userProfile.certifications.includes(cert) ? 1 : 0);
  });

  // Languages encoding
  allLanguages.forEach(lang => {
    encoding.push(userProfile.languages.includes(lang) ? 1 : 0);
  });

  // Physical capabilities encoding
  allPhysicalCapabilities.forEach(cap => {
    encoding.push(userProfile.physicalCapabilities.includes(cap) ? 1 : 0);
  });

  // Preferences encoding
  allPreferences.forEach(pref => {
    encoding.push(userProfile.preferences.includes(pref) ? 1 : 0);
  });

  return encoding;
}

// Create one-hot encoding for an opportunity
export function encodeOpportunity(opportunity: Opportunity): number[] {
  const encoding: number[] = [];

  // Required skills encoding
  allSkills.forEach(skill => {
    const isRequired = opportunity.requiredSkills.includes(skill);
    const isPreferred = opportunity.preferredSkills.includes(skill);
    // Weight required skills higher than preferred skills
    encoding.push(isRequired ? 1 : (isPreferred ? 0.5 : 0));
  });

  // Experience level (normalized to 0-1)
  encoding.push(opportunity.experienceLevel / 5);

  // Certifications encoding
  allCertifications.forEach(cert => {
    encoding.push(opportunity.certifications.includes(cert) ? 1 : 0);
  });

  // Languages encoding
  allLanguages.forEach(lang => {
    encoding.push(opportunity.languages.includes(lang) ? 1 : 0);
  });

  // Physical requirements encoding
  allPhysicalCapabilities.forEach(cap => {
    encoding.push(opportunity.physicalRequirements.includes(cap) ? 1 : 0);
  });

  // Work type encoding
  allPreferences.forEach(pref => {
    encoding.push(opportunity.workType.includes(pref) ? 1 : 0);
  });

  return encoding;
}

// Calculate Euclidean distance between two encoded profiles
function calculateDistance(encoding1: number[], encoding2: number[]): number {
  if (encoding1.length !== encoding2.length) {
    throw new Error('Encodings must have the same length');
  }

  let sum = 0;
  for (let i = 0; i < encoding1.length; i++) {
    sum += Math.pow(encoding1[i] - encoding2[i], 2);
  }
  return Math.sqrt(sum);
}

// Calculate similarity score (inverse of distance, normalized to 0-1)
function calculateSimilarity(distance: number): number {
  // Convert distance to similarity (closer = more similar)
  // Using exponential decay for better scaling
  return Math.exp(-distance);
}

// Find matching skills between user and opportunity
function findMatchingSkills(userSkills: string[], requiredSkills: string[], preferredSkills: string[]): {
  matched: string[];
  missing: string[];
} {
  const matched: string[] = [];
  const missing: string[] = [];

  // Check required skills
  requiredSkills.forEach(skill => {
    if (userSkills.includes(skill)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  // Add preferred skills that user has
  preferredSkills.forEach(skill => {
    if (userSkills.includes(skill) && !matched.includes(skill)) {
      matched.push(skill);
    }
  });

  return { matched, missing };
}

// Generate reasons for the match
function generateMatchReasons(
  userProfile: UserProfile,
  opportunity: Opportunity,
  matchedSkills: string[],
  missingSkills: string[]
): string[] {
  const reasons: string[] = [];

  // Skill matches
  if (matchedSkills.length > 0) {
    reasons.push(`You have ${matchedSkills.length} required/preferred skills: ${matchedSkills.slice(0, 3).join(', ')}${matchedSkills.length > 3 ? '...' : ''}`);
  }

  // Experience level
  if (userProfile.experienceLevel >= opportunity.experienceLevel) {
    reasons.push(`Your experience level (${userProfile.experienceLevel}/5) meets the requirement (${opportunity.experienceLevel}/5)`);
  }

  // Emergency response experience
  if (opportunity.urgency === 'critical' && userProfile.emergencyResponse) {
    reasons.push('Your emergency response experience is valuable for this critical need');
  }

  // Location proximity (simplified)
  if (userProfile.location && opportunity.location) {
    if (userProfile.location.toLowerCase().includes(opportunity.location.toLowerCase()) ||
        opportunity.location.toLowerCase().includes(userProfile.location.toLowerCase())) {
      reasons.push('Location match - you\'re in the same area');
    }
  }

  // Certifications
  const matchingCerts = userProfile.certifications.filter(cert => 
    opportunity.certifications.includes(cert)
  );
  if (matchingCerts.length > 0) {
    reasons.push(`You have relevant certifications: ${matchingCerts.join(', ')}`);
  }

  // Languages
  const matchingLanguages = userProfile.languages.filter(lang => 
    opportunity.languages.includes(lang)
  );
  if (matchingLanguages.length > 0) {
    reasons.push(`You speak required languages: ${matchingLanguages.join(', ')}`);
  }

  // Preferences
  const matchingPreferences = userProfile.preferences.filter(pref => 
    opportunity.workType.includes(pref)
  );
  if (matchingPreferences.length > 0) {
    reasons.push(`Matches your work preferences: ${matchingPreferences.slice(0, 2).join(', ')}`);
  }

  return reasons;
}

// KNN matching algorithm
export function findMatches(
  userProfile: UserProfile,
  opportunities: Opportunity[],
  k: number = 10
): MatchResult[] {
  const userEncoding = encodeUserProfile(userProfile);
  
  const matches: Array<{ opportunity: Opportunity; distance: number }> = [];

  opportunities.forEach(opportunity => {
    if (opportunity.status !== 'open') return;

    const opportunityEncoding = encodeOpportunity(opportunity);
    const distance = calculateDistance(userEncoding, opportunityEncoding);
    const similarity = calculateSimilarity(distance);

    // Calculate base score from similarity
    let score = similarity * 100;

    // Boost score for critical needs
    if (opportunity.urgency === 'critical') {
      score *= 1.2;
    }

    // Boost score for high urgency
    if (opportunity.urgency === 'high') {
      score *= 1.1;
    }

    // Penalize for missing required skills
    const { matched, missing } = findMatchingSkills(
      userProfile.skills,
      opportunity.requiredSkills,
      opportunity.preferredSkills
    );
    
    if (missing.length > 0) {
      score *= (1 - missing.length * 0.1); // 10% penalty per missing skill
    }

    // Boost for having all required skills
    if (missing.length === 0) {
      score *= 1.3;
    }

    matches.push({ opportunity, distance });
  });

  // Sort by distance (closest first) and take top k
  matches.sort((a, b) => a.distance - b.distance);
  const topMatches = matches.slice(0, k);

  // Convert to MatchResult format
  return topMatches.map(({ opportunity }) => {
    const { matched, missing } = findMatchingSkills(
      userProfile.skills,
      opportunity.requiredSkills,
      opportunity.preferredSkills
    );

    const opportunityEncoding = encodeOpportunity(opportunity);
    const distance = calculateDistance(userEncoding, opportunityEncoding);
    const similarity = calculateSimilarity(distance);
    
    let score = similarity * 100;
    if (opportunity.urgency === 'critical') score *= 1.2;
    if (opportunity.urgency === 'high') score *= 1.1;
    if (missing.length > 0) score *= (1 - missing.length * 0.1);
    if (missing.length === 0) score *= 1.3;

    const reasons = generateMatchReasons(userProfile, opportunity, matched, missing);

    return {
      opportunity,
      score: Math.round(score),
      matchedSkills: matched,
      missingSkills: missing,
      reasons
    };
  });
}

// Get personalized recommendations based on user profile
export function getPersonalizedRecommendations(
  userProfile: UserProfile,
  opportunities: Opportunity[]
): {
  perfectMatches: MatchResult[];
  goodMatches: MatchResult[];
  learningOpportunities: MatchResult[];
} {
  const allMatches = findMatches(userProfile, opportunities, 20);
  
  const perfectMatches: MatchResult[] = [];
  const goodMatches: MatchResult[] = [];
  const learningOpportunities: MatchResult[] = [];

  allMatches.forEach(match => {
    if (match.score >= 80 && match.missingSkills.length === 0) {
      perfectMatches.push(match);
    } else if (match.score >= 60) {
      goodMatches.push(match);
    } else if (match.score >= 40) {
      learningOpportunities.push(match);
    }
  });

  return {
    perfectMatches: perfectMatches.slice(0, 5),
    goodMatches: goodMatches.slice(0, 5),
    learningOpportunities: learningOpportunities.slice(0, 3)
  };
} 