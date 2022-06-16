describe("Buscar formações", () => {
  beforeEach(() => {
    cy.visit("https://www.alura.com.br");
  });
  it("Formação de JavaScript", () => {
    cy.get("#header-barraBusca-form-campoBusca").type("JavaScript");
    cy.get(".header-barraBusca-form-submit").click();
    cy.get("h4.busca-resultado-nome").should(
      "contain",
      "Formação JavaScript para back-end"
    );
  });
});
