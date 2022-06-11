declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    existingCategories(): Rule
    cpfIsValid(): Rule
  }
}
