# Arcanjosa S.A. — CP05: O Pipeline DevSecOps Completo

Repositório de referência da **Arcanjosa S.A.** para a disciplina **DevSecOps and Cloud Computing** (FIAP — Engenharia de Software).

## Estrutura do Projeto

- [`Dockerfile`](./Dockerfile): Empacotamento da aplicação estática utilizando `nginx:alpine`.
- [`index.html`](./index.html), [`style.css`](./style.css), [`app.js`](./app.js): Portal corporativo da Arcanjosa S.A.
- [`.github/workflows/security.yml`](./.github/workflows/security.yml): Pipeline DevSecOps automatizado executado a cada `push` e `pull_request`.

---

## Explicação das Barreiras de Segurança (Shift Left)

### 1. Secret Scanning — Gitleaks
O **Gitleaks** atua como a primeira barreira de *Secret Scanning* dentro da esteira de CI/CD, inspecionando todo o histórico de commits do repositório (`fetch-depth: 0`) a cada `push` ou `pull_request`. Seu papel é identificar credenciais, chaves de API (como chaves AWS `AKIA...`), tokens e senhas commitadas acidentalmente no código-fonte antes que o artefato avance para o build ou produção. No teste de sabotagem (**Prova 1**), a adição do arquivo `config.js` contendo uma chave AWS falsa (`AKIAZ3X9F8QK2LMNPQRS`) fez com que o Gitleaks detectasse imediatamente o padrão de segredo vazado e bloqueasse a execução do pipeline com erro, comprovando a eficácia da prevenção contra vazamento de credenciais.

### 2. SAST (Static Application Security Testing) — Semgrep
O **Semgrep** realiza a análise estática de segurança do código-fonte (*SAST*), lendo a árvore sintática da aplicação em busca de padrões de codificação inseguros, vulnerabilidades conhecidas (como *Injection* e *Cross-Site Scripting*) e más práticas de segurança, sem precisar executar a aplicação. Configurado no workflow com o conjunto de regras `p/default` (`semgrep ci --config auto`), ele revisa automaticamente o código a cada alteração. No teste de sabotagem (**Prova 2**), a introdução da função `eval()` processando entrada dinâmica do usuário em JavaScript foi imediatamente identificada pelo Semgrep como risco de injeção e execução arbitrária de código (`detect-eval-with-expression`), apontando a linha exata da vulnerabilidade nos logs do GitHub Actions.
