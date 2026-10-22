// Utilitário interno Arcanjosa S.A.
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-calcular");
  const input = document.getElementById("expressao");
  const resultado = document.getElementById("resultado");

  if (btn && input && resultado) {
    btn.addEventListener("click", () => {
      const valor = Number(input.value);
      resultado.textContent = Number.isFinite(valor)
        ? `Resultado: R$ ${valor.toFixed(2)}`
        : "Resultado: informe um valor numérico válido.";
    });
  }
});
