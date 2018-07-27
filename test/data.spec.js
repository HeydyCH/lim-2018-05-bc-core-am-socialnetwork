describe('emailValidator(string)', () => {

  it('debería retornar true para fiorella@gmail.com', () => {
     assert.equal(window.emailValidator('fiorella@gmail.com'), true);
  });

  it('debería retornar false para hola123', () => {
     assert.equal(window.emailValidator('hola123'), false);
  });

});

describe('nameValidator(string)', () => {

  it('debería retornar true para fiorella', () => {
     assert.equal(window.nameValidator('fiorella'), true);
  });

  it('debería retornar false para hola', () => {
     assert.equal(window.nameValidator('hola'), false);
  });

});

describe('passwordValidator(string)', () => {

  it('debería retornar true para 1Abcfiore', () => {
     assert.equal(window.passwordValidator('1Abcfiore'), true);
  });

  it('debería retornar false para hola123', () => {
     assert.equal(window.passwordValidator('hola123'), false);
  });

});
