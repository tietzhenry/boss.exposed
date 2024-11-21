import { rpc } from "@/lib/rpc"
import { handleEden } from "@/utils/base"
import { useMutation, useQuery } from "@tanstack/react-query"

export const AssetHook = () => {
    const backgroundMutation = useMutation({
        mutationFn: async (file: File) => {   
            return handleEden(await rpc.api.customize.assets.background.post({background: file}));
        }
    });

    const assetQuery = useQuery({
        queryKey: ["assets"],
        queryFn: async () =>
          {return handleEden(await rpc.api.customize.assets.get())},
      });

    return {
        backgroundMutation,
        assetQuery
    }
}
