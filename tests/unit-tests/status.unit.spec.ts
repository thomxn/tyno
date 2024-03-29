import 'jest'
import { computeSHA256, encodeBase64 } from '../../api/utils/cipher'
import logger from '../../api/utils/logger'

describe('Cipher utility', () => {
  beforeAll(() => {
    logger.silent = true
  })
  it('should generate SHA256 from input', async () => {
    const response = computeSHA256('http://www.facebook.com')
    expect(response).toEqual('df018842d92bf0e2ffdf0734e297b6e952a443425046daaa977678961d0281c7')
  })
  it('should generate base64 encoded string from input', async () => {
    const response = encodeBase64('Hi my name is Giovanni Georgio')
    expect(response).toEqual('SGkgbXkgbmFtZSBpcyBHaW92YW5uaSBHZW9yZ2lv')
  })
})
