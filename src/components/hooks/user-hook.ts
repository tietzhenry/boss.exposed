import { rpc } from "@/lib/rpc"
import { handleEden } from "@/utils/base"
import { useQuery } from "@tanstack/react-query"


export const UserHook = () => {
    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: async () => handleEden(await rpc.api.user.current.get())
    })
    return {userQuery}
};
