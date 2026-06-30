# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey olgamanajenkova!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

## Backend URL and startup

- Backend runs on port `8000`.
- In Codespaces, the API base URL is built from `CODESPACE_NAME` as:
  `https://$CODESPACE_NAME-8000.app.github.dev`
- The frontend also reads `VITE_CODESPACE_NAME` from Vite environment variables via `import.meta.env`.
- Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` for Codespaces URLs. Example:
  ```text
  VITE_CODESPACE_NAME=your-codespace-name
  ```
- When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to `http://localhost:8000/api` instead of building an invalid GitHub hostname.
- Locally, the fallback API URL is:
  `http://localhost:8000`
- The backend exposes runtime config at `/config` and upstreams `/api/*` via Vite proxy for local frontend development.

To run the backend:
```bash
cd octofit-tracker/backend
npm install
npm run dev
```

To run the frontend:
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/olgamanajenkova/skills-build-applications-w-copilot-agent-mode/issues/1)

