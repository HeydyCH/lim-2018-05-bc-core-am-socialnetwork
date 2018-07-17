describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(emailValidator);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(passwordValidator);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(nameValidator);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(valuesGood);
  });

  // describe('computeUsersStats(users, progress, courses)', () => {
  //
  //   it('debería retornar arreglo de usuarios con propiedad stats', () => {
  //     const processed = computeUsersStats(users, progress, courses);
  //
  //     assert.equal(users.length, processed.length);
  //
  //     processed.forEach(user => {
  //       assert.ok(user.hasOwnProperty('stats'));
  //       assert.isNumber(user.stats.percent);
  //       assert.isObject(user.stats.exercises);
  //       assert.isObject(user.stats.quizzes);
  //       assert.isObject(user.stats.reads);
  //     });
  //   });
  //
  //   describe('user.stats para el primer usuario en data de prueba - ver carpeta data/');
  //
  // });

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    it('debería retornar arreglo de usuarios ordenado por nombre ASC');
    it('debería retornar arreglo de usuarios ordenado por nombre DESC');
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC');
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC');
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC');
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC');
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC');
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC');
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC');
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC');
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC');
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC');

  });

  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
