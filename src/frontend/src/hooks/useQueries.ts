import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo, MenuItem } from "../backend.d";
import { useActor } from "./useActor";

export function useMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBusinessInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<BusinessInfo>({
    queryKey: ["businessInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "BYOB",
          instagram: "@thebyobman",
          address:
            "111, Sodepur Rd, Basunagar, Madhyamgram, Kolkata, West Bengal 700129",
          phone: "+91 98765 43210",
        };
      }
      return actor.getBusinessInfo();
    },
    enabled: !!actor && !isFetching,
  });
}
