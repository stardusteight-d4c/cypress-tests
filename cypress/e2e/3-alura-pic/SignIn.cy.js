describe("Verificar mensagens de validação no SignIn de usuários:", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.intercept("POST", "https://apialurapic.herokuapp.com/user/login", {
    //   statusCode: 400,
    // }).as("login"); // Simular erro de requisição -> mocks e stubs, são técnicas fundamentais para executar algumas verificações de forma controlada.
  });

  it("Fazer login de usuario válido", () => {
    cy.login(Cypress.env("userName"), Cypress.env("password"));
    // cy.wait("@login");
    cy.contains("a", "(Logout)").should("be.visible");
  });

  it("Fazer login de usuario inválido", () => {
    cy.login("NotExist", "1234");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });
});
