'use client'

import { z } from 'zod';
import { GGInput } from '../personal-form-components/GGInput';
import { GGDateInput } from '../personal-form-components/GGDateInput';
import { Form } from '../personal-form-components/Form';
import { Button } from '../ui/button';
import { CircleUserRound, KeyRound, Mail, AtSign, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const RegisterSchema = z.object({
  username: z.string().min(6, "Mínimo de 6 caracteres"),
  email: z.email("E-mail inválido"),
  displayName: z.string().min(6, "Mínimo de 6 caracteres"),
  birthDate: z.string()
      .min(10, "Data incompleta")
      .refine((val) => {
        // Tenta converter a string DD/MM/YYYY para um objeto Date real
        const [day, month, year] = val.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        // Valida se a data é válida (ex: evita 31/02/2024)
        return date instanceof Date && !isNaN(date.getTime()) &&
               date.getDate() === day && (date.getMonth() + 1) === month;
      }, { message: "Data inválida" }),
  password: z.string().min(8, "Mínimo de 8 caracteres")
});

type RegisterData = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const router = useRouter();
  const onSubmit = async (data: RegisterData) => {
    try {
      await api.post('/auth/register', data);
      router.push('/map');
    } catch(error) {
      console.error("Erro no Axios:", error);
    }
  }

  return (
    <Form schema={RegisterSchema} onSubmit={onSubmit} className="grid grid-cols-12 gap-x-4 center w-full">
      <GGInput name="username" Icon={AtSign} guideText="Username" className="col-span-12" isRequired/>
      <GGInput name="email" Icon={Mail} guideText="E-mail" type="email" className="col-span-12" isRequired/>
      <GGInput name="displayName" Icon={CircleUserRound} guideText="Display name" className="col-span-8"/>
      <GGDateInput name="birthDate" label="Data de nascimento:" className="col-span-4"/>
      <GGInput name="password" Icon={KeyRound} guideText="Password" type="password" className="col-span-12" isRequired/>
      <GGInput name="repeatPassword" Icon={ShieldCheck} guideText="Repeat password" type="password" className="col-span-12" isRequired />
      <Button type="submit" className="col-start-5 col-span-4">Register</Button>
    </Form>
  )
}
