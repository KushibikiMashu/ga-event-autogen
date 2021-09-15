# GA Event Autogen
Auto generation tool for Google Analytics Event with TypeScript Compiler API.

This tool converts yaml to ts file.

Run this command below and `types.ts` will generate from `events.yaml`.

```
$ yarn convert
```

```yaml
# events.yaml
- name: ConvertStart
  property:
    action: 'convert_start'
    category: 'convert'

- name: ConvertEnd
  property:
    action: 'convert_end'
    category: 'convert'

- name: ConvertError
  property:
    action: 'convert_error'
    category: 'convert'
```

```ts
// types.ts
type ConvertStart = {
    action: "convert_start";
    category: "convert";
};

type ConvertEnd = {
    action: "convert_end";
    category: "convert";
};

type ConvertError = {
    action: "convert_error";
    category: "convert";
};

export type Event = (ConvertStart | ConvertEnd | ConvertError) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
}
```

You don't need to define Google Analytics Event type manually.

```ts
import { Event } from './types.ts'

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
export const existsGaId = GA_ID !== ''

export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const event = ({ action, category, label, value = '' }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : '',
    value,
  })
}
```

I show the whole code on my blog -> [Next.jsでGoogle Analyticsを使えるようにする](https://panda-program.com/posts/nextjs-google-analytics).
