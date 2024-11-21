import { rpc } from "@/lib/rpc"
import { handleEden } from "@/utils/base"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export const userdisplayHook = () => {
    const params = useParams()
    const userdisplayQuery = useQuery(
        {queryKey: ["userdisplay", params.username],
            enabled: true,
            queryFn: async () => {
                if(typeof params.username !== "string"){
                    throw new Error("Username is not of type string")
                }
                return handleEden(await rpc.api.userdisplay.username[params.username].get())
            }
        }
    )

    
    return {
        userdisplayQuery
    }
}