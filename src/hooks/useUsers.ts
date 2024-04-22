// hooks/useUsers.js
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { User } from "../types";

export function useUsers({ walletAddress }: { walletAddress: string | null }) {
  const getUser = useQuery(api.users.getUser, { walletAddress: walletAddress as string }) as User[];
  const updateUser = useMutation(api.users.updateUser);
  const createUser = useMutation(api.users.createUser);
  const deleteUser = useMutation(api.users.deleteUser);

  return { getUser, updateUser, createUser, deleteUser };
}
