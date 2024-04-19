import { FieldValues, Validate } from 'react-hook-form'

const validatePassword = async (
  value: string
): Promise<Validate<any, FieldValues>> => {
  if (!value)
    return {
      valid: false,
      message: '비밀번호를 입력해주세요',
    }

  const minLength = value.length >= 8
  const containsUppercase = /[A-Z]/.test(value)
  const containsLowercase = /[a-z]/.test(value)
  const containsNumber = /[0-9]/.test(value)
  const containsSpecial = /[!@#$%^&*]/.test(value)

  // 최소 8자리 이상
  if (!minLength)
    return {
      valid: false,
      message: '비밀번호는 최소 8자리 이상이어야 합니다.',
    }

  // 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합으로 구성
  if (
    !(
      containsUppercase &&
      containsLowercase &&
      containsNumber &&
      containsSpecial
    )
  )
    return {
      valid: false,
      message:
        '비밀번호 8자리 이상은 대문자, 소문자, 숫자, 특수문자 중 3종류 이상을 포함해야 합니다.',
    }

  // 최소 10자리 이상 조건 추가
  if (
    value.length >= 10 &&
    !(
      (containsUppercase && containsLowercase) ||
      (containsUppercase && containsNumber) ||
      (containsUppercase && containsSpecial) ||
      (containsLowercase && containsNumber) ||
      (containsLowercase && containsSpecial) ||
      (containsNumber && containsSpecial)
    )
  )
    return {
      valid: false,
      message:
        '비밀번호 10자리 이상은 대문자, 소문자, 숫자, 특수문자 중 2종류 이상을 포함해야 합니다.',
    }

  return {
    valid: true,
  }
}

export default validatePassword
