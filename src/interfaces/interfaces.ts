export enum SchoolSubject {
  Portuguese = "Portuguese",
  Mathematics = "Mathematics",
  Science = "Science",
  History = "History",
  Geography = "Geography",
  PhysicalEducation = "PhysicalEducation",
  Arts = "Arts",
  English = "English",
  Biology = "Biology",
  Chemistry = "Chemistry",
  Physics = "Physics",
  Sociology = "Sociology",
  Philosophy = "Philosophy",
  Other = "Other",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  contentPreferences?: string;
  createdContents: Content[];
  comments: Comment[];
  votes: Vote[];
  contentFeeds: ContentFeed[];
}

export interface Content {
  id: string;
  title: string;
  description?: string;
  type: string;
  creationDate: Date;
  authorId: string;
  generatedContent: string;
  status: string;
  upvotes: number;
  downvotes: number;
  tags?: string;
  visibility: string;
  subject: SchoolSubject;
  subdisciplineId?: string;
  author: User;
  comments: Comment[];
  votes: Vote[];
  contentCreationForms: ContentCreationForm[];
}

export interface Subdiscipline {
  id: string;
  name: string;
  subject: SchoolSubject;
}

export interface Comment {
  id: string;
  contentId: string;
  userId: string;
  text: string;
  creationDate: Date;
  content: Content;
  user: User;
}

export interface Vote {
  id: string;
  contentId: string;
  userId: string;
  type: string;
  voteDate: Date;
  content: Content;
  user: User;
}

export interface ContentCreationForm {
  id: string;
  fields: string;
  generationParameters: string;
  submissionDate: Date;
  generatedContentId: string;
  content: Content;
}

export interface ContentFeed {
  id: string;
  userId: string;
  visibleContents: string;
  sortingCriteria: string;
  user: User;
}
