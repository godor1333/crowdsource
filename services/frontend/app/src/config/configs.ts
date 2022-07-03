export default {
  urlsWithoutInterceptors: ['/logs/client'],
  typeUser: ['work', 'customer'],
  recaptchaKey: '6Le9lrwZAAAAAA3o5C3vD8hoewxm02k8PYp5FNN-',
  systemTitle: {
    fullName: 'ИС "Индивидуальные образовательные траектории"',
    shortName: 'ИС "ИОТ"'
  },
  routing: {
    authPage: {
      path: '/auth',
      name: 'Авторизация в системе'
    },
    homePage: {
      path: '/partners/news',
      name: 'Новости партнеров'
    }
  },
  customerInput: [
    {
      value: 'photo',
      title: 'Фотоданные'
    },
    {
      value: 'text',
      title: 'Текстовые данные'
    }
  ],
  mobileWidth: 768,
  defaultWidth: 1000,
  listDistricts: ['Мурино', 'Новое Девяткино', 'Лаврики']
}
