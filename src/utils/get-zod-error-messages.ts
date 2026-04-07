import { z } from 'zod'

type FormattedError<T> = ReturnType<z.ZodError<T>['format']>
type ZodFieldError = {
  _errors?: string[]
}

export function getZodErrorMessages<T>(error: FormattedError<T>): string[] {
  return Object.values(error as Record<string, ZodFieldError>)
    .map(field => field?._errors ?? [])
    .flat()
    .filter(Boolean)
}
