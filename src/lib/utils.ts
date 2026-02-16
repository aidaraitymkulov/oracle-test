export function maskAccount(account: string): string {
  const first5 = account.slice(0, 5);
  const last4 = account.slice(-4);
  return `${first5} * * * * ${last4}`;
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('ru-RU');
}

export function generateId(): string {
  return crypto.randomUUID();
}
