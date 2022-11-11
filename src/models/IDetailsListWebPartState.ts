export interface IRecruitmentTracker {
  CandidateName: string;
  Position: string;
  Progress: string;
  InterviewDate: Date;
  LinkedInProfile:object;
}

export interface IDetailsListWebPartState {
  items: IRecruitmentTracker[];
}
