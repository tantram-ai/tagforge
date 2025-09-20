import { create } from 'zustand'


type GuardedRouteState = {
    routeName: string | null
    setName: any
  }
  
  export const useGuardedRoutesStore = create<GuardedRouteState>((set) => ({
    routeName:null,
    setName: (name:any) => set({routeName:name})
  }))
