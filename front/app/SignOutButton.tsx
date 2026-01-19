"use client";
import { signOutWithForm } from "@/server-actions/auth";
import { useSession } from "next-auth/react";

const SignOutButton = () => {
  const { data: session } = useSession();

  const handleSignOutAction = async () => {
    await signOutWithForm(session?.user?.refreshToken);
  };

  return (
    <form action={handleSignOutAction}>
      <button type="submit">Logout</button>
    </form>
  );
};

export default SignOutButton;
