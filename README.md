# Credit Limit Management — CRM-модуль

Внутренний модуль для сотрудников банка: управление заявками на изменение кредитного лимита.

## Запуск

```bash
npm install
npm run dev
```

## Скрипты

- `npm run dev` — dev-сервер
- `npm run build` — сборка
- `npm run lint` — проверка ESLint
- `npm run lint:fix` — автоисправление
- `npm run format` — форматирование Prettier

## Стек и обоснование выбора

- **Zustand** — минимальный API, не требует провайдеров и boilerplate как Redux
- **TanStack Table** — headless-таблица с типизацией, полный контроль над рендером
- **React Hook Form + Zod** — производительные формы без лишних ре-рендеров, валидация на уровне схемы
- **Radix UI** — доступные примитивы (Dialog, Select) без навязанных стилей
- **Tailwind CSS** — утилитарный подход, быстрая стилизация без отдельных CSS-файлов
- **use-debounce** — debounce поиска без ручной реализации

## Структура

```
src/
├── components/
│   ├── ApplicationTable/   # Таблица, фильтры, колонки
│   ├── ApplicationModal/   # Модалка, форма, лог
│   └── ui/                 # Button, Input, Select, Modal
├── hooks/                  # useApplications, useActivityLog
├── store/                  # Zustand store
├── lib/                    # Mock API, валидация, утилиты
├── types/                  # TypeScript интерфейсы
└── data/                   # Моковые данные
```

## Реализованные фичи

- [x] Таблица заявок с фильтром по статусу и поиском по ФИО (debounce 300ms)
- [x] Модальная форма редактирования с условной валидацией (лимит > 1М — причина обязательна)
- [x] Маскирование счёта: `40817 * * * * 1234`
- [x] Сессионный лог активности
- [x] Loading-скелетон и обработка ошибок с retry
- [x] Mock API с имитацией задержки и 10% ошибок
- [x] Строгий TypeScript — ноль `any`
