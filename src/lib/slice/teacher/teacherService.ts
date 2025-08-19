import { ITeacher } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// create a teacher
export const createTeacher = async (data: ITeacher): Promise<ITeacher> => {
  const res = await fetch(`${API_URL}/create-teachers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create teacher");
  }

  return res.json();
};

// get all teachers
export const getTeachers = async (): Promise<ITeacher[]> => {
  const res = await fetch(`${API_URL}/get-teachers`);
  if (!res.ok) throw new Error("Failed to fetch teachers");
  return res.json();
};

// get teacher by ID
export const getTeacherById = async (id: string): Promise<ITeacher> => {
  const res = await fetch(`${API_URL}/teacher/${id}`);
  if (!res.ok) throw new Error("Failed to fetch teacher");
  return res.json();
};

// update teacher
export const updateTeacher = async (
  id: string,
  data: ITeacher
): Promise<ITeacher> => {
  const res = await fetch(`${API_URL}/teacher/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update teacher");
  }

  return res.json();
};

// delete teacher
export const deleteTeacher = async (
  id: string
): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/teacher/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete teacher");
  }

  return res.json();
};
