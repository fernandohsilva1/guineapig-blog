'use client'

import { loginAction } from '@/actions/login/login-action'
import { Button } from '@/components/Button'
import { InputText } from '@/components/Input/InputText'
import clsx from 'clsx'
import { LogsIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const dynamic = 'force-dynamic'

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  }
  const [state, action, isPending] = useActionState(loginAction, initialState)

  useEffect(() => {
    if (state.error) {
      toast.dismiss()
      toast.error(state.error)
    }
  }, [state])

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'mx-auto mt-16 mb-32 max-w-sm text-center',
      )}
    >
      <form action={action} className='flex flex-1 flex-col gap-6'>
        <InputText
          type='text'
          name='username'
          labelText='Usuário'
          placeholder='Seu usuário'
          disabled={isPending}
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
        />
        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogsIcon />
          Entrar
        </Button>

        {!!state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  )
}
