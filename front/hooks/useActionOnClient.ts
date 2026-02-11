import { useActionState, useEffect, useEffectEvent } from "react"

type Awaitable<T> = T | Promise<T>

export interface ErrorState {
  field?: string
  code?: string
  message?: string
}

interface ActionState extends ErrorState {
  ok: boolean
}

type Action<P> = (payload: P) => Awaitable<ActionState>

interface UseActionOnClientOptions<P> {
  action: Action<P>
  onSuccess?: () => void
  onError?: (error: ErrorState) => void
}

interface UseActionOnClientReturns<P> {
  action: (payload: P) => void
  getActionState: () => ActionState
  isPending: boolean
}

export function useActionOnClient<P>(action: Action<P>): UseActionOnClientReturns<P>
export function useActionOnClient<P>(options: UseActionOnClientOptions<P>): UseActionOnClientReturns<P>

export function useActionOnClient<P>(params: UseActionOnClientOptions<P> | Action<P>) {
  const { action, onSuccess, onError } = distributeParam(params)
  const [actionState, _action, isPending] = useActionState(
    (s: unknown, p: P) => action(p),
    INITIAL_ACTION_STATE
  )
  const getHandlers = useEffectEvent(() => ({ onSuccess, onError }))

  const getActionState = () => actionState

  useEffect(() => {
    if (!actionState) return
    const { onSuccess, onError } = getHandlers()
    const { ok, field, code, message } = actionState

    if (ok) {
      onSuccess?.()
    } else if (!ok && message) {
      onError?.({ field, code, message })
    }
  }, [actionState])

  return { action: _action, getActionState, isPending }
}

const distributeParam = <P>(params: UseActionOnClientOptions<P> | Action<P>) => {
  if (typeof params === "function") {
    return { action: params }
  }
  return params
}

const INITIAL_ACTION_STATE: ActionState = { ok: false, code: "", message: "" }