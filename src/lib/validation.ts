import { z } from 'zod';

export const applicationFormSchema = z
  .object({
    newLimit: z
      .number({ error: 'Укажите новый лимит' })
      .min(0, 'Лимит не может быть отрицательным')
      .max(10_000_000, 'Лимит не может превышать 10 000 000'),
    reason: z.string().optional(),
    status: z.enum(['New', 'Approved', 'Rejected'], {
      error: 'Выберите статус',
    }),
  })
  .refine(
    (data) => {
      if (data.newLimit > 1_000_000) {
        return !!data.reason && data.reason.length > 0;
      }
      return true;
    },
    {
      message: 'Укажите причину для лимита свыше 1 000 000',
      path: ['reason'],
    }
  );

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
