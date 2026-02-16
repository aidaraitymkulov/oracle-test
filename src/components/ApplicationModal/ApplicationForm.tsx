import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationFormSchema, type ApplicationFormData } from '../../lib';
import { maskAccount, formatCurrency } from '../../lib';
import { Input, Select, Button } from '../ui';
import type { Application } from '../../types';

const baseReasons = [
  { value: 'credit_history', label: 'Улучшение кредитной истории' },
  { value: 'income_increase', label: 'Увеличение дохода' },
  { value: 'business_expansion', label: 'Расширение бизнеса' },
];

const specialRiskOption = {
  value: 'special_risk',
  label: 'Особый риск',
};

const statusOptions = [
  { value: 'New', label: 'Новая' },
  { value: 'Approved', label: 'Одобрена' },
  { value: 'Rejected', label: 'Отклонена' },
];

interface ApplicationFormProps {
  application: Application;
  isSubmitting: boolean;
  onSubmit: (data: ApplicationFormData) => void;
}

export const ApplicationForm = ({
  application,
  isSubmitting,
  onSubmit,
}: ApplicationFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      newLimit: application.requestedLimit,
      reason: '',
      status: application.status,
    },
  });

  const newLimit = watch('newLimit');
  const isHighLimit = newLimit > 1_000_000;

  const reasonOptions = isHighLimit
    ? [...baseReasons, specialRiskOption]
    : baseReasons;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-3 rounded-lg bg-gray-50 p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Счёт</span>
          <span className="font-mono">{maskAccount(application.account)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Текущий лимит</span>
          <span>{formatCurrency(application.currentLimit)} ₽</span>
        </div>
      </div>

      <Input
        id="newLimit"
        label="Новый лимит"
        type="number"
        error={errors.newLimit?.message}
        {...register('newLimit', { valueAsNumber: true })}
      />

      <Controller
        name="reason"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            options={reasonOptions}
            label={isHighLimit ? 'Причина (обязательно)' : 'Причина'}
            placeholder="Выберите причину..."
            error={errors.reason?.message}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            options={statusOptions}
            label="Статус"
            error={errors.status?.message}
          />
        )}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
};
