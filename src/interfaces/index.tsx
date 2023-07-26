export type Project = {
  id: string;
  name?: string;
  description?: string;
  geometry?: string;
  published?: boolean;
  authorId?: string;
  score?: number;
  methodology?: string;
};

export interface ApiMessageResponse {
  message: string;
}

export interface FormProps {
  onSubmit: (data: Project) => void;
}
