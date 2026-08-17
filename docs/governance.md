# Governance — the recommended baseline

This template recommends a small set of conventions for course repositories.
They are guidance, not policy; change or remove them when they do not fit your
course.

## Recommendations

| ID | Recommendation | Why |
|---|---|---|
| CS-1 | Keep `VERIFICATION-LOG.md` | Students use a predictable format to disclose AI assistance and verification. |
| CS-2 | Keep real tests in `tests/` | An empty suite can report success without checking anything. |
| CS-3 | Keep CI on push and pull request | Students get feedback before submission. |
| CS-4 | Keep instructions in `docs/` | Students know where to look for the assignment contract. |
| CS-5 | Keep an orienting `README.md` | A new student should understand the project before opening the source. |

The exercise, language, framework choice, test count, performance checks, and
grading configuration remain the instructor's decisions. This project happens
to use Node's built-in HTTP server and test runner so the starter has no
framework dependency.
