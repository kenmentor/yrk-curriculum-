# UI Kit — versions & mapping

Library: **DaisyUI v5** (Tailwind CSS v4 plugin) + **lucide-svelte** icons.
Rationale: solid, accessible, Tailwind-native; covers required kit without bespoke copies.

| Required (spec) | DaisyUI equivalent |
|---|---|
| Modal | `modal` + `modal-box` |
| Field | `fieldset`, `label`, `input/select/textarea` |
| Stepper | `steps` |
| Breadcrumb | `breadcrumbs` |
| Tabs | `tabs` |
| Pagination | `join` + `btn` |
| RichTextEditor | native `textarea` in v1 (Tiptap deferred to keep foundation lean) |

Theme: DaisyUI `dark` default + 1School tokens in `src/routes/layout.css` (`--color-accent #7853da` etc.).
Source of truth for chat UI remains `one-school-chat/src/lib/components/*`; no cross-repo imports — patterns copied, not linked.
