// Utilitário interno Arcanjosa S.A. — Sabotagem SAST (Prova 2 - Semgrep)
function executarCalculoFinanceiro(expressaoUsuario) {
  // VULNERABILIDADE PROPOSITAL (CWE-95): Uso de eval() com entrada dinâmica do usuário
  return eval(expressaoUsuario);
}

// Exemplo de rota Express vulnerável a Code Injection via eval() para detecção SAST
function rotaCalculoRemoto(req, res) {
  const formula = req.query.formula;
  const resultado = eval(formula);
  res.send("Resultado: " + resultado);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-calcular");
  const input = document.getElementById("expressao");
  const resultado = document.getElementById("resultado");

  if (btn && input && resultado) {
    btn.addEventListener("click", () => {
      const expressaoUsuario = input.value;
      const valor = executarCalculoFinanceiro(expressaoUsuario);
      resultado.textContent = `Resultado: ${valor}`;
    });
  }
});
