describe("Verificar mensagens de validação no SignUp de usuários:", () => {
  beforeEach(() => {
    cy.visit("http://alura-fotos.herokuapp.com/#/home");
  });

  it("Mensagem de validação", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required!").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
  });

  it("Campo <email> com formatação inválida", () => {
    cy.contains("a", "Register now").click();
    cy.get("input[formcontrolname='email']").type("meuemail");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("Campo <full name> com no mínimo 2 caracteres", () => {
    cy.contains("a", "Register now").click();
    cy.get("input[formcontrolname='fullName']").type("a");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 2").should("be.visible");
  });

  it("Campo <user name> com no mínimo 2 caracteres", () => {
    cy.contains("a", "Register now").click();
    cy.get("input[formcontrolname='userName']").type("a");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 2").should("be.visible");
  });

  it("Campo <password> com no mínimo 8 caracteres", () => {
    cy.contains("a", "Register now").click();
    cy.get("input[formcontrolname='password']").type("a");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  const usuarios = require("../../fixtures/usuarios.json");
  describe("Registrando usuários", () => {
    usuarios.forEach((usuario) => {
      it("SignUp realizado", () => {
        cy.contains("a", "Register now").click();
        cy.registrar(
          `${usuario.email}`,
          `${usuario.fullName}`,
          `${usuario.userName}`,
          `${usuario.password}`
        );
        cy.contains("button", "Register").click();
      });
    });
  });
});

describe("Verificar mensagens de validação no SignIn de usuários:", () => {
  beforeEach(() => {
    cy.visit("http://alura-fotos.herokuapp.com/#/home");
  });

  it("Fazer login de usuario válido", () => {
    cy.login("flavio", "123");
    cy.contains("a", "Logout").should("be.visible");
  });

  it("Fazer login de usuario inválido", () => {
    cy.login("flavio", "1234");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });
});
