import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation } from "@tanstack/react-query";

/**
 * Custom hook which can be imported in "use client" components
 */
export const AuthHook = () => {
  /**
   * Uses the RPC client to call the register endpoint parse it with handleEden.
   */
  const signUpMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.auth.signup.post>
    ) => handleEden(await rpc.api.auth.signup.post(...args)),
  });

  /**
   * Uses the RPC client to call the login endpoint and parse it with handleEden.
   */
  const signInMutation = useMutation({
    mutationFn: async (...args: Parameters<typeof rpc.api.auth.signin.post>) =>
      handleEden(await rpc.api.auth.signin.post(...args)),
  });

  /**
   * Uses the RPC client to call the logout endpoint and parse it with handleEden.
   */
  const signOutMutation = useMutation({
    mutationFn: async () => handleEden(await rpc.api.auth.signout.get()),
  });

  return {
    signUpMutation,
    signInMutation,
    signOutMutation,
  };
};
