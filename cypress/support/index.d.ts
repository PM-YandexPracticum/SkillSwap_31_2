declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface Chainable<Subject = any> {
    initApp(withAuth?: boolean): Chainable<void>;
  }
}
