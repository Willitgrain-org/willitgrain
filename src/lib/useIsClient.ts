import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/**
 * false during SSR and hydration, true afterwards. Lets islands render
 * client-only output (e.g. a random order) without a hydration mismatch and
 * without calling setState inside an effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
