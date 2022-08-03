describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Matti Luukainen logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "mluukkai",
        password: "salainen",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("a new blog can be created", function () {
      cy.contains("create new blog").click();

      cy.get("#form-title").type("another test bites the dust");
      cy.get("#form-author").type("me");
      cy.get("#form-url").type("www.example.com");
      cy.get("#create-button").click();

      cy.contains("another test bites the dust");
    });

    it("user can like a blog", function () {
      cy.contains("create new blog").click();

      cy.get("#form-title").type("another test bites the dust");
      cy.get("#form-author").type("me");
      cy.get("#form-url").type("www.example.com");
      cy.get("#create-button").click();

      cy.contains("view").click();
      cy.get(".like").click();

      cy.contains("likes 1");
    });

    it("user can delete a blog", function () {
      cy.contains("create new blog").click();

      cy.get("#form-title").type("another test bites the dust");
      cy.get("#form-author").type("me");
      cy.get("#form-url").type("www.example.com");
      cy.get("#create-button").click();

      cy.contains("view").click();
      cy.contains("remove", { timeout: 30000 }).click();
    });

    it("sort the blog based on number of likes", function () {
      cy.contains("create new blog").click();

      cy.get("#form-title").type("The title with the second most likes");
      cy.get("#form-author").type("me");
      cy.get("#form-url").type("www.example.com");
      cy.get("#create-button").click();
      cy.contains("view").click();

      cy.get("#form-title").type("The title with the most likes");
      cy.get("#form-author").type("me");
      cy.get("#form-url").type("www.example.com");
      cy.get("#create-button").click();
      cy.contains("view").click();

      cy.get(".like").then((buttons) => {
        cy.wrap(buttons[0]).click();
        cy.wrap(buttons[1]).click();
        cy.wrap(buttons[1]).click();
      });

      cy.get(".blog").eq(0).should("contain", "The title with the most likes");
      cy.get(".blog")
        .eq(1)
        .should("contain", "The title with the second most likes");
    });
  });
});
