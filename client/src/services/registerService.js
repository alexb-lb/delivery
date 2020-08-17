import { EMAIL_ALREADY_TAKEN } from 'dictionaries/serverStatuses'
import RequestService from 'services/requestService'

class RegisterService {
  validators = {
    facebookToken: async (facebookToken) => {
      if (!facebookToken) {
        return { isValid: false, message: 'Помилка при спробi обробки даних Фейсбук' }
      }

      return { isValid: true, message: '' }
    },
    email: async (email) => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!email || !regex.test(email.trim().toLowerCase())) {
        return { isValid: false, message: 'Будь-ласка, вкажіть коректний емейл' }
      }

      const { status } = await RequestService.request({ url: `/auth/email/${email}` })

      if (status === EMAIL_ALREADY_TAKEN) {
        return { isValid: false, message: 'Емейл з такою назвою вже зареєстровано' }
      }

      return { isValid: true, message: '' }
    },
    password: async ({ password, passwordRepeat }) => {
      if (!password || password.trim().length < 5) {
        return { isValid: false, message: 'Будь-ласка, вкажіть пароль довжиною від 5 символів' }
      }

      if (!passwordRepeat || password.trim() !== passwordRepeat.trim()) {
        return { isValid: false, message: 'Паролі не співпадають' }
      }

      return { isValid: true, message: '' }
    },
    name: async (name) => {
      const regex = /^[a-zA-Z0-9А-Яа-я]+$/

      if (!name || name.trim().length < 2 || !regex.test(name.trim())) {
        return { isValid: false, message: 'Будь-ласка, вкажіть коректне ім\'я' }
      }

      return { isValid: true, message: '' }
    },
    phone: async (phone) => {
      if (!phone || phone.trim().match(/\d/g).length !== 10) {
        return { isValid: false, message: 'Будь-ласка, вкажіть коректний номер' }
      }

      return { isValid: true, message: '' }
    },
    warehouseId: async (warehouseId) => {
      if (!warehouseId || !+warehouseId || warehouseId === 0) {
        return { isValid: false, message: 'Будь-ласка, оберіть магазин-склад' }
      }

      return { isValid: true, message: '' }
    },
    residenceId: async (residenceId) => {
      if (!residenceId || !+residenceId || residenceId === 0) {
        return { isValid: false, message: 'Будь-ласка, оберіть вашу адресу' }
      }

      return { isValid: true, message: '' }
    },
    address: async (address) => {
      if (!address || address.length === 0) {
        return { isValid: false, message: 'Будь-ласка, оберіть вашу адресу' }
      }

      return { isValid: true, message: '' }
    },
    section: async (section) => {
      if (!section) {
        return { isValid: false, message: 'Будь-ласка, оберіть під\'їзд' }
      }

      return { isValid: true, message: '' }
    },
    floor: async (floor) => {
      if (!floor || !+floor) {
        return { isValid: false, message: 'Будь-ласка, оберіть поверх' }
      }

      return { isValid: true, message: '' }
    },
    apartment: async (apartment) => {
      if (!apartment || !+apartment) {
        return { isValid: false, message: 'Будь-ласка, оберіть квартиру' }
      }

      return { isValid: true, message: '' }
    },
    comment: async () => {
      return { isValid: true, message: '' }
    },
  }

  async validate(values) {
    try {
      const resultArray = await Promise.all(Object.entries(values).map(async ([key, value]) => {
        if (!this.validators[key]) throw new Error('KEY_INCORRECT')

        const validateResult = await this.validators[key](value)

        return { element: key, ...validateResult }
      }))

      const error = await resultArray.find(r => r.isValid === false)

      return error || { isValid: true, message: '', element: '' }
    } catch (e) {
      return alert(e.message)
    }
  }
}

export default new RegisterService()
