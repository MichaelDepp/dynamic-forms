export type formData = {
  name: string;
  type: string;
};

export type formDataWithId = {
  id: string;
  name: string;
  type: string;
};

export type formArrays = {
  fieldArray: formData[];
};

export type formList = {
  id: string;
  title: string;
  fieldArray: formData[];
};
