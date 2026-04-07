'use client'

import { z } from 'zod';
import { GGInput } from '../personal-form-components/GGInput';
import { Form } from '../personal-form-components/Form';
import { Button } from '../ui/button';
import { KeyRound, AtSign } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  username: z.string().min(6, "Mínimo de 6 caracteres"),
  password: z.string().min(8, "Mínimo de 8 caracteres")
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const onSubmit = async (data: LoginData) => {
    try {
      await api.post('/auth/login', data);
      router.push('/map');
    } catch(error) {
      console.error("Erro no Axios:", error);
    }
  }

  return (
    <Form schema={loginSchema} onSubmit={onSubmit} className="grid grid-cols-12 gap-x-4 center w-full">
      <GGInput name='username' type='text' guideText='Username' Icon={AtSign} className='col-span-12'/>
      <GGInput name='password' type='password' guideText='Password' Icon={KeyRound} className='col-span-12'/>
      <div className="flex flex-row justify-around col-span-12 mb-2">
        <Link href={'/'} className='text-gg-cyan underline hover:text-gg-cyan-dark'>Esqueceu a senha?</Link>
        <Link href={'/'} className='text-gg-cyan underline hover:text-gg-cyan-dark'>Voltar ao início</Link>
      </div>
      <Button type="submit"
        className="col-start-4 col-span-6 bg-gg-beige-extralight
          border border-dotted border-gg-beige-extradark
        text-gg-beige-extradark mt-2 hover:cursor-pointer
        hover:bg-gg-beige-light">Login</Button>
    </Form>
  )
}
